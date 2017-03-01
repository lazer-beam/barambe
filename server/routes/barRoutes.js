const router = require('express').Router()

const jwtCheck = require('../utilities/authUtil').jwtCheck
const barCtrl = require('../controllers/barCtrl')

// router.get('/getbar/:name', barCtrl.bars.get)
router.get('/connect', barCtrl.bars.connect)
router.get('/connect/callback', barCtrl.bars.getBarStripeData)
router.get('/stripe/:shit', jwtCheck, barCtrl.bars.finalizeBarStripeData)

module.exports = router
