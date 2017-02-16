const barsHelper = require('../utilities/barUtil')
const qs = require('querystring')
const request = require('request')

const bars = {
  get: (req, res) => {
    const name = req.params.name
    const bar = barsHelper.getBar(name)
    res.send(bar)
  },
  connect: (req, res) => {
    res.redirect('https://connect.stripe.com/oauth/authorize?' + qs.stringify({
      response_type: 'code',
      scope: 'read_write',
      client_id: process.env.devClientId,
    }))
  },
  getBarStripeData: (req, res) => {
    const queryCode = req.query.code
    request.post({
      url: 'https://connect.stripe.com/oauth/token',
      form: {
        grant_type: 'authorization_code',
        client_id: process.env.devClientId,
        code: queryCode,
        client_secret: process.env.testKey,
      },
    }, (err, resp, body) => {
      res.send('Bar created')
      // store the response obj in database
    })
  },
}

module.exports = {
  bars,
}
