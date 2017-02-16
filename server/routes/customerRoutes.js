const router = require('express').Router()
const cusCtrl = require('../controllers/customerCtrl')

router.post('/customer/newuser', cusCtrl.customer.create)
router.post('/customer/pay', cusCtrl.customer.pay)

module.exports = router
