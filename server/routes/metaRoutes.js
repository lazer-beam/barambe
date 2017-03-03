const router = require('express').Router()
const rp = require('request-promise')

router.get('/', (req, res) => {
  const METADATA_NETWORK_INTERFACE_URL = 'http://metadata/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip'
  const options = {
    url: METADATA_NETWORK_INTERFACE_URL,
    headers: {
      'Metadata-Flavor': 'Google',
    },
  }

  rp(options)
    .then(ipRes => {
      console.log('ipRes', ipRes)
      const ipAsAString = `${ipRes}`
      console.log('ipAsAString', ipAsAString)
      res.send(ipAsAString)
    }).catch(err => {
      res.status(500).send(err)
    })
})

module.exports = router
