const qs = require('querystring')
const request = require('request')
const BarSchema = require('../../dbGlobal/Bar')

const Bar = mongoose.model('Bar', BarSchema)

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
    }, (stripeErr, resp, body) => {
      console.log('body: ', body)
      console.log('resp: ', resp)
      console.log('err: ', stripeErr)
      console.log('stripeID: ', JSON.parse(body).stripe_user_id)
      // store JSON.parse(body).stripe_user_id in database
      Bar.create({
        subdomain: String,
        authId: String,
        stripe: JSON.parse(body).stripe_user_id,
        picture: String,
        location: String,
      }, (barErr, result) => {
        if (barErr) res.send(err)
        if (result) res.send(`New bar created, ID: ${JSON.parse(body).stripe_user_id}`)
      })
    })
    res.redirect('http://localhost:1337/dashboard')
  },
}

module.exports = {
  bars,
}
