const qs = require('querystring')
const request = require('request')

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
      if (false) {
        console.log('body', body)
      }
      // store the response bar obj in database
    })
  },
}

module.exports = {
  bars,
}
