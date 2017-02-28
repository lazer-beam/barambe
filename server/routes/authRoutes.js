const router = require('express').Router()
const jwtCheck = require('../utilities/authUtil').jwtCheck
const authCtrl = require('../controllers/authCtrl')
const authUtil = require('../utilities/authUtil')

// ----------------- Middleware ----------------- //
const checkToken = (req, res, next) => {
  if (process.env.AUTH_MANAGMENT_TOKEN === '' || process.env.AUTH_MANAGMENT_EXP > Date.now()) {
    authUtil.createNewToken(next.bind(this))
  } else { next() }
}

// ----------------- Routes ----------------- //
router.post('/test', jwtCheck, authCtrl.default)
router.post('/setBarUsername', jwtCheck, checkToken, authCtrl.setBarUsername)

module.exports = router
