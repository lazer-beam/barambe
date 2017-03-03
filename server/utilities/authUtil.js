const jwksRsa = require('jwks-rsa')
const jwt = require('express-jwt')
const jToken = require('jsonwebtoken')
const decoded = require('jwt-decode')
const rp = require('request-promise')
const qs = require('qs')
const chalk = require('chalk')

/**
 * Middleware to sign RSA BARTENDER client tokens
 *
 */
module.exports.jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://barambe.auth0.com/.well-known/jwks.json',
  }),
  audience: process.env.AUTH_CLIENT_ID,
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  algorithms: ['RS256'],
})

module.exports.checkBars = barname => {
  const postStr = qs.stringify({
    fields: 'app_metadata.barname',
    include_fields: 'true',
    q: `app_metadata.barname:${barname}`, // {/m.*/} for first letter is m
  })
  return rp({
    uri: `${process.env.AUTH_MANAGMENT_AUDIENCE}users?${postStr}`,
    headers: { authorization: `Bearer ${process.env.AUTH_MANAGMENT_TOKEN}` },
  })
}

module.exports.addBarUniqueName = (userId, barname) => {
  const opts = {
    method: 'PATCH',
    uri: `${process.env.AUTH_MANAGMENT_AUDIENCE}users/auth0%7C${userId}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH_MANAGMENT_TOKEN}`,
      contentType: 'application/json',
    },
    body: {
      app_metadata: { barname },
    },
    json: true,
  }
  return rp(opts)
}

module.exports.addBartenderStripe = (userId, stripe) => {
  const opts = {
    method: 'PATCH',
    uri: `${process.env.AUTH_MANAGMENT_AUDIENCE}users/auth0%7C${userId}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH_MANAGMENT_TOKEN}`,
      contentType: 'application/json',
    },
    body: {
      app_metadata: { stripe },
    },
    json: true,
  }
  return rp(opts)
}

module.exports.createNewToken = next => {
  console.log(chalk.blue('CREATING NEW AUTH TOKEN, DOESNT EXIST...'))
  const opts = {
    method: 'POST',
    url: 'https://barambe.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH_MANAGMENT_CLIENT_ID,
      client_secret: process.env.AUTH_MANAGMENT_CLIENT_SECRET,
      audience: process.env.AUTH_MANAGMENT_AUDIENCE,
    },
    json: true,
  }
  rp(opts).then(token => {
    const tokenDecoded = jToken.decode(token.access_token)
    process.env.AUTH_MANAGMENT_EXP = tokenDecoded.exp
    process.env.AUTH_MANAGMENT_TOKEN = token.access_token
    next()
  }).catch(err => {
    console.log(err)
  })
}

/**
 * This is the middleware helper function that generates managment tokens
 */
module.exports.mobileManagmentToken = next => {
  console.log(chalk.blue('CREATING NEW MOBILE AUTH TOKEN, DOESNT EXIST...'))
  const opts = {
    method: 'POST',
    url: 'https://barambe-mobile.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH_MOBILE_M_CLIENT_ID,
      client_secret: process.env.AUTH_MOBILE_M_SECRET,
      audience: process.env.AUTH_MOBILE_M_AUDIENCE,
    },
    json: true,
  }
  rp(opts).then(token => {
    const decode = jToken.decode(token.access_token)
    process.env.AUTH_MOBILE_M_EXP = decode.exp
    process.env.AUTH_MOBILE_M_TOKEN = token.access_token
    next()
  }).catch(err => {
    console.log(err)
  })
}

const getTokenExpirationDate = token => {
  if (token === undefined) return null
  const dcd = decoded(token)
  if (!dcd.exp) {
    return null
  }

  const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(dcd.exp)
  return date
}

module.exports.isTokenExpired = token => {
  if (token === undefined) return true
  const date = getTokenExpirationDate(token)
  const offsetSeconds = 0
  if (date === null) {
    return false
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}

module.exports.editUserMetadata = (userId, metadata) => {
  console.log(metadata)
  const opts = {
    method: 'PATCH',
    uri: `${process.env.AUTH_MANAGMENT_AUDIENCE}users/auth0%7C${userId}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH_MANAGMENT_TOKEN}`,
      contentType: 'application/json',
    },
    body: {
      user_metadata: metadata,
    },
    json: true,
  }
  return rp(opts)
}

/**
 * -----To Find query strings-----
 * qs.parse('fields=app_metadata.barname&include_fields=true&q=app_metadata.barname%3AmyCoolBar')
 */
