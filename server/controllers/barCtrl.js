const qs = require('querystring')
const request = require('request')
const Cryptr = require('cryptr')
const rp = require('request-promise')
const co = require('co')

const barUtil = require('../utilities/barUtil')
const authUtil = require('../utilities/authUtil') 

const cryptr = new Cryptr(process.env.STRIPE_SECRET)

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
    // co(function* () {
    //   const stripe = yield barUtil.barStripeData(queryCode)

    //   const bars = yield authUtil.checkBars(barname)
    //   if (bars !== '[]') {
    //     res.status(422).send('Name Already Taken')
    //   } else {
    //     const name = yield authUtil.addBarUniqueName(id, barname)
    //     res.status(200).send(name)
    //   }
    // }).catch(onError)

    // request.post({
    //   url: 'https://connect.stripe.com/oauth/token',
    //   form: {
    //     grant_type: 'authorization_code',
    //    //  client_id: process.env.devClientId,
    //     code: queryCode,
    //     client_secret: process.env.testKey,
    //   },
    // }, (err, resp, body) => {
    //   console.log('body: ', body.stripe_user_id)

    // })
  },
  finalizeBarStripeData: (req, res) => {
    console.log("==========================================")
    console.log(req.params)
    res.status(200).send(req.query)
  },
}

module.exports = { bars }

// req.params