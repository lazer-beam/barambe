const router = require('express').Router()
const tabsCtrl = require('../controllers/tabsCtrl')

router.get('/opentab', tabsCtrl.tabs.open)

module.exports = router
