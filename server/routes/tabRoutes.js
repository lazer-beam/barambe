const router = require('express').Router()
const tabsCtrl = require('../controllers/tabsCtrl')

router.post('/opentab', tabsCtrl.tabs.open)

module.exports = router
