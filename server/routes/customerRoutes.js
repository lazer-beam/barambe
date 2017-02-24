const router = require('express').Router()
const cusCtrl = require('../controllers/customerCtrl')

router.post('/pay', cusCtrl.customer.pay)
router.post('/saveInfo', cusCtrl.customer.saveInfo)

module.exports = router
