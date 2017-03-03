const qs = require('querystring')
// const Cryptr = require('cryptr')
const co = require('co')
const NodeGeocoder = require('node-geocoder')

const barUtil = require('../utilities/barUtil')
const authUtil = require('../utilities/authUtil')

// const cryptr = new Cryptr(process.env.STRIPE_SECRET)
const onError = err => console.log(err)

const bars = {
  connect: (req, res) => {
    const authParams = qs.stringify({
      response_type: 'code',
      scope: 'read_write',
      client_id: process.env.devClientId,
    })
    res.redirect(`https://connect.stripe.com/oauth/authorize?${authParams}`)
  },
  getBarStripeData: (req, res) => {
    const queryCode = req.query.code
    res.redirect(`/dashboard?query=${queryCode}`)
  },

  finalizeBarStripeData: (req, res) => {
    const token = req.params.token
    const id = req.user.sub.slice(req.user.sub.indexOf('|') + 1)

    co(function* () {
      const stripe = yield barUtil.barStripeData(token)
      const stripe2 = JSON.parse(stripe)
      // const encrypt = cryptr.encrypt(stripe2.stripe_user_id)
      const result = yield authUtil.addBartenderStripe(id, stripe2.stripe_user_id)
      res.status(200).send(result)
    }).catch(onError)
  },

  submitInfo: (req, res) => {
    // req.body has: businessName, address, city, state, and imgUrl
    const options = {
      provider: 'google',
      httpAdapter: 'https',
      apiKey: process.env.GOOGLE_API,
      formatter: null,
    }

    const geocoder = NodeGeocoder(options)
    geocoder.geocode(`${req.body.address} ${req.body.city}`)
      .then(geoRes => {
        // we'll store the lat/long so app can calc distance,
        // formatted address to maybe list on nearbyBars beside the bar name,
        // and the imgUrl?
        console.log('geoRes ', geoRes)
        if (geoRes.length === 0) {
          res.status(400).send('Formatting error')
          return
        }
        const latLong = [geoRes[0].latitude, geoRes[0].longitude]
        const address = geoRes[0].formattedAddress
        res.send({ latLong, address })
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  },
}

module.exports = { bars }
