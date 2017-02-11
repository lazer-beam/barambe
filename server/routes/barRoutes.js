const router = require('express').Router()
const barCtrl = require('../controllers/barCtrl')

router.get('/getbar/:name', barCtrl.bars.get)

module.exports = router