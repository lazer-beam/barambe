const router = require('express').Router()
const tabsCtrl = require('../controllers/tabsCtrl')

router.post('/opentab', tabsCtrl.tabs.open)
router.put('/closetab/:id', tabsCtrl.tabs.close)

module.exports = router
