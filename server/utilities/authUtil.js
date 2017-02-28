const jwksRsa = require('jwks-rsa')
const jwt = require('express-jwt')
const jToken = require('jsonwebtoken')
const rp = require('request-promise')
const qs = require('qs')
const chalk = require('chalk')

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


module.exports.createNewToken = next => {
  console.log(chalk.blue('CREATING NEW AUTH TOKEN, DOESNT EXIST...'))
  const opts = {
    method: 'POST',
    url: 'https://barambe.auth0.com/oauth/token',
    headers: { authorization: `Bearer ${process.env.AUTH_MANAGMENT_TOKEN}` },
    body: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH_MANAGMENT_CLIENT_ID,
      client_secret: process.env.AUTH_MANAGMENT_CLIENT_SECRET,
      audience: process.env.AUTH_MANAGMENT_AUDIENCE,
    },
    json: true,
  }
  rp(opts).then(token => {
    const decoded = jToken.decode(token.access_token)
    process.env.AUTH_MANAGMENT_EXP = decoded.exp
    process.env.AUTH_MANAGMENT_TOKEN = token.access_token
    next()
  }).catch(err => {
    console.log(err)
  })
}

/**
 * -----To Find query strings-----
 * qs.parse('fields=app_metadata.barname&include_fields=true&q=app_metadata.barname%3AmyCoolBar')
 */
