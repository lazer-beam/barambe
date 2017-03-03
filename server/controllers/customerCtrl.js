const customerUtil = require('../utilities/customerUtil')

const customer = {
  addCard: (req, res) => {
    const authId = req.user.sub
    const card = req.body
    customerUtil.addCard(authId, card).then(cardMetadata => {
      res.status(200).send(cardMetadata)
    }).catch(err => {
      console.log(err.message)
      res.status(400).send(err)
    })
  },

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
        console.log(`Pay success: ${charge}`)
        res.send(charge)
      }
    })
  },

  saveInfo: (req, res) => {
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

  getGeo: (req, res) => {
    customerUtil.getGeo(req.query)
      .then(geo => {
        console.log('geo', geo)
        res.send(geo)
      }).catch(err => {
        res.status(500).send(err)
      })
  },
}

module.exports = {
  customer,
}
