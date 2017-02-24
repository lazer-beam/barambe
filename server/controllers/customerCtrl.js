const stripe = require('stripe')(process.env.testKey)

const customer = {
  // add SDK interaction later for existing stripe users, change creation logic also
  // create: (req, res) => {
  //   console.log(`Serving request for ${req.method} where url is ${req.url}`)
  //   const authID = req.body.authID
  //   const token = req.body.token
  //   stripe.customers.create({
  //     email: null,
  //     source: token,
  //   }).then(newCustomer => {
  //     // save customerID in database, corresponding to authID
  //     res.send({ result: 'User created' })
  //   }).catch(err => {
  //     res.send(err)
  //   })
  // },

  // pay: (req, res) => {
  //   console.log(`Serving request for ${req.method} where url is ${req.url}`)
  //   const authID = req.body.authID
  //   const currency = req.body.currency
  //   const amount = req.body.amount
  //   const barID = req.body.barID
  //   // get the barStripeID using the barAuthID, and use it in the charge creation
  //   cusHelper.getCusID(authID)
  //   .then(cusID => {
  //     stripe.charges.create({
  //       amount,
  //       currency,
  //       customer: cusID,
  //       // destination: { account: barStripeID }
  //     })
  //   })
  //   .then(chargeRes => {
  //     res.send(chargeRes)
  //   })
  //   .catch(err => {
  //     res.send(err)
  //   })
  // },

  saveCard: (req, res) => {
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
