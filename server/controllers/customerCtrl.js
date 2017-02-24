const stripe = require('stripe')(process.env.testKey)

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
          send(newCustomer.id)
        // save newCustomer.id in Mongoose
          // stripe.customers.createSource(
          // newCustomer.id,
          // { source: req.body.token },
          // (cardErr, card) => {
          //   if (cardErr) {
          //     res.send(cardErr)
          //   } else {
          //     const cardObj = {
          //       id: card.id,
          //       brand: card.brand,
          //       customerID: card.customer,
          //       last4: card.last4,
          //       exp_month: card.exp_month,
          //       exp_year: card.exp_year,
          //     }
          //     console.log(`New cardObj created: ${cardObj}`)
          //     // save cardObj in mongo
          //     res.send(cardObj)
          //   }
          // })
        }
      })
  },
}

module.exports = {
  customer,
}
