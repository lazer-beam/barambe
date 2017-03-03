const router = require('express').Router()
const authUtil = require('../utilities/authUtil')
const customerCtrl = require('../controllers/customerCtrl')
const jwt = require('express-jwt')

const jwtCheck = jwt({ secret: process.env.AUTH_MOBILE_SECRET, audience: process.env.AUTH_MOBILE_AUDIENCE })

const checkManagmentMobileToken = (req, res, next) => {
  if (!process.env.AUTH_MOBILE_M_TOKEN ? true : authUtil.isTokenExpired(process.env.AUTH_MOBILE_M_TOKEN)) {
    authUtil.mobileManagmentToken(next.bind(this))
  } else { next() }
}

router.post('/pay', customerCtrl.customer.pay)
router.post('/saveInfo', customerCtrl.customer.saveInfo)
router.get('/getLocation', customerCtrl.customer.getGeo)
router.post('/addCard', jwtCheck, checkManagmentMobileToken, customerCtrl.customer.addCard)

module.exports = router
