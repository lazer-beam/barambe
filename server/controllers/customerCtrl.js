const stripe = require('stripe')(process.env.testKey)
// const Customer = require('../../dbGlobal/Customer')

const customer = {
  pay: (req, res) => {
    console.log(`Serving request for ${req.method} where url is ${req.url}`)
    stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      customer: req.body.stripeID,
      destination: req.body.barID,
    }, (err, charge) => {
      if (err) {
        res.send(err)
      } else {
        res.send(charge)
      }
    })
  },

  saveInfo: (req, res) => {
    console.log(`Serving request for ${req.method} where url is ${req.url}`)
    console.log(`Req.body: ${req.body}`)
    stripe.customers.create(
      { source: req.body.token },
      (customerErr, newCustomer) => {
        if (customerErr) {
          res.send(customerErr)
        } else {
          console.log(`New customer object with id: ${newCustomer.id}`)
          console.log(`Card brand is ${req.body.cardBrand}, last4 is ${req.body.last4}`)
    // add req.body.cardBrand, req.body.last4, and the newCustomer.id to the JWT
          // Customer.create({
          //   authId: req.authId,
          //   stripe: newCustomer.id,
          // }, (err, newCustomerDocument) => {
          //   res.send(`New customer created, ID: ${newCustomerDocument.id}`)
          // })
        }
      })
  },
}

module.exports = {
  customer,
}
