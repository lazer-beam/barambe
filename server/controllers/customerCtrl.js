const stripe = require('stripe')(process.env.testKey)
// const Customer = require('../../dbGlobal/Customer')

const customer = {
  pay: (req, res) => {
    stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      customer: req.body.stripeID,
      destination: req.body.barID,
    }, (err, charge) => {
      if (err) {
        console.log(`Pay error: ${err}`)
        res.send(err)
      } else {
        console.log('Pay success')
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
          console.log('newCustomer object is: ', newCustomer)
          console.log(`New customer object with id: ${newCustomer.id}`)
          console.log(`Card brand is ${newCustomer.cardBrand}, last4 is ${newCustomer.last4}`)
          console.log(`Stripe cardObject ID is ${newCustomer.default_source}`)
          stripe.customers.retrieveCard(
            newCustomer.id,
            newCustomer.default_source,
            (err, obj) => {
              if (err) {
                res.send(err)
                return
              }
              res.send(`Card brand is ${obj.brand} and last4 is ${obj.last4} and customer stripe is ${newCustomer.id}`)
              // save the above info in a JWT
            })
        }
      })
  },
}

module.exports = {
  customer,
}
