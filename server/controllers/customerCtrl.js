const cusHelper = require('../utilities/cusUtil')
const stripe = require('stripe')(process.env.testKey)

const customer = {
  create: (req, res) => {
    console.log(`Serving request for ${req.method} where url is ${req.url}`)
    const authID = req.body.authID
    const token = req.body.token
    stripe.customers.create({
      email: null,
      source: token,
    }).then(customer => {
      // save customerID in database, corresponding to authID
      res.send({ result: 'User created' })
    }).catch(err => {
      res.send(err)
    })
  },

  pay: (req, res) => {
    console.log(`Serving request for ${req.method} where url is ${req.url}`)
    const authID = req.body.authID
    const currency = req.body.currency
    const amount = req.body.amount
    cusHelper.getCusID(authID)
    .then(cusID => {
      stripe.charges.create({
        amount,
        currency,
        customer: cusID,
      })
    })
    .then(chargeRes => {
      res.send(chargeRes)
    })
    .catch(err => {
      res.send(err)
    })
  },
}

module.exports = {
  customer,
}
