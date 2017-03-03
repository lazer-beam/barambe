const router = require('express').Router()
const jwtCheck = require('../utilities/authUtil').jwtCheck
const authCtrl = require('../controllers/authCtrl')
const authUtil = require('../utilities/authUtil')

// ----------------- Middleware ----------------- //
const checkToken = (req, res, next) => {
  if (!process.env.AUTH_MANAGMENT_TOKEN ? true : authUtil.isTokenExpired(process.env.AUTH_MANAGMENT_TOKEN)) {
    authUtil.createNewToken(next.bind(this))
  } else { next() }
}

// ----------------- Routes ----------------- //
router.post('/test', jwtCheck, authCtrl.default)
router.post('/setBarUsername', jwtCheck, checkToken, authCtrl.setBarUsername)
router.post('/setUserMetadata', jwtCheck, checkToken, authCtrl.setUserMetadata)
// router.post('/addBusiness', authCtrl.addBusiness)

module.exports = router
