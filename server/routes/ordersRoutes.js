const router = require('express').Router()
const ordersCtrl = require('../controllers/ordersCtrl')

router.get('/getallpending', ordersCtrl.orders.get)
router.put('/closeorder/:id', ordersCtrl.orders.close)

module.exports = router
