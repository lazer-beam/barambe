const router = require('express').Router()
const ordersCtrl = require('../controllers/ordersCtrl')

router.get('/getallpending', ordersCtrl.orders.get)

module.exports = router
