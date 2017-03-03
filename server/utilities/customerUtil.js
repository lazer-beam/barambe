const rp = require('request-promise')
const stripe = require('stripe')('sk_test_GrfMBadtYtC5VQ5oZUWPRx3r')
const Promise = require('bluebird')
const NodeGeocoder = require('node-geocoder')

const geoOptions = {
  provider: 'google',
}
const geocoder = NodeGeocoder(geoOptions)

const setOptionUri = (authId, { name, last4, brand, cust_tok }) => {
  return {
    method: 'PATCH',
    uri: `${process.env.AUTH_MOBILE_M_AUDIENCE}users/${authId}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH_MOBILE_M_TOKEN}`,
      contentType: 'application/json',
    },
    body: {
      app_metadata: {
        card: {
          name, last4, brand, cust_tok,
        },
      },
    },
    json: true,
  }
}

const authMetadata = (authId, card) => rp(setOptionUri(authId, card))

const stripeCreateCustomer = card => stripe.customers.create({ card })

// { number, exp_month, exp_year, cvc }
module.exports.addCard = (authId, { name, number, exp_month, exp_year, cvc }) => {
  return new Promise((resolve, reject) => {
    stripeCreateCustomer({ number, exp_month, exp_year, cvc, object: 'card' }).then(strp => {
      this.strp_id = strp.id
      console.log(this.strp_id)
      return stripe.customers.retrieveCard(strp.id, strp.default_source)
    }).then(stripeCard => {
      const card = { name, cust_tok: this.strp_id, last4: stripeCard.last4, brand: stripeCard.brand }
      return authMetadata(authId, card)
    }).then(tokenInfo => {
      resolve(tokenInfo.app_metadata.card)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports.getGeo = address => geocoder.geocode(address)
  .then(geoArr => {
    return {
      latitude: geoArr[0].latitude,
      longitude: geoArr[0].longitude,
    }
  })
