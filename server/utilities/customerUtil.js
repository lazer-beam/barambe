const rp = require('request-promise')
const stripe = require('stripe')('sk_test_GrfMBadtYtC5VQ5oZUWPRx3r')
const Promise = require('bluebird')

const setOptionUri = (authId, { name, last4, brand, stripe_tok }) => {
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
          name, last4, brand, stripe_tok,
        },
      },
    },
    json: true,
  }
}

const authMetadata = (authId, card) => rp(setOptionUri(authId, card))

const stripeCreateCard = card => stripe.tokens.create({ card })

// { number, exp_month, exp_year, cvc }
module.exports.addCard = (authId, { name, number, exp_month, exp_year, cvc }) => {
  return new Promise((resolve, reject) => {
    stripeCreateCard({ number, exp_month, exp_year, cvc }).then(strp => {
      const card = { name, stripe_tok: strp.id, last4: strp.card.last4, brand: strp.card.brand }
      return authMetadata(authId, card)
    }).then(tokenInfo => {
      resolve(tokenInfo.app_metadata.card)
    }).catch(err => {
      reject(err)
    })
  })
}
