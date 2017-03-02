const qs = require('querystring')
const Cryptr = require('cryptr')
const co = require('co')

const barUtil = require('../utilities/barUtil')
const authUtil = require('../utilities/authUtil')

const cryptr = new Cryptr(process.env.STRIPE_SECRET)
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
      const encrypt = cryptr.encrypt(stripe2.stripe_user_id)
      const result = yield authUtil.addBartenderStripe(id, encrypt)
      res.status(200).send(result)
    }).catch(onError)
  },
}

module.exports = { bars }
