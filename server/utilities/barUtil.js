const rp = require('request-promise')

module.exports.barStripeData = queryCode => {
  const opts = {
    method: 'POST',
    url: 'https://connect.stripe.com/oauth/token',
    form: {
      grant_type: 'authorization_code',
      //  client_id: process.env.devClientId,
      code: queryCode,
      client_secret: process.env.testKey,
    },
  }
  return rp(opts)
}
