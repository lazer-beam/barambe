const router = require('express').Router()
const barCtrl = require('../controllers/barCtrl')

router.get('/getbar/:name', barCtrl.bars.get)
router.get('/connect', barCtrl.bars.connect)
router.get('/connect/callback', barCtrl.bars.getBarStripeData)

module.exports = router
