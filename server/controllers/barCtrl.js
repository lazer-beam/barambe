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
        code: queryCode,
        client_secret: process.env.testKey,
      },
    }, (err, resp, body) => {
      console.log('body: ', body)
      console.log('resp: ', resp)
      console.log('err: ', err)
      console.log('stripeID: ', JSON.parse(body).stripe_user_id)
      // store JSON.parse(body).stripe_user_id in database
    })
    res.redirect('http://localhost:1337/dashboard')
  },
}

module.exports = {
  bars,
}
