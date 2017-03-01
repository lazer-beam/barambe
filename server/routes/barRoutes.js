const router = require('express').Router()

const authUtil = require('../utilities/authUtil')
const barCtrl = require('../controllers/barCtrl')

// ----------------- Middleware ----------------- //
const checkToken = (req, res, next) => {
  if (process.env.AUTH_MANAGMENT_TOKEN === '' || process.env.AUTH_MANAGMENT_EXP > Date.now()) {
    authUtil.createNewToken(next.bind(this))
  } else { next() }
}

router.get('/connect', barCtrl.bars.connect)
router.get('/connect/callback', barCtrl.bars.getBarStripeData)
router.get('/stripe/:token', authUtil.jwtCheck, checkToken, barCtrl.bars.finalizeBarStripeData)

module.exports = router
