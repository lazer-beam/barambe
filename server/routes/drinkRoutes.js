const router = require('express').Router()
const drinkCtrl = require('../controllers/drinkCtrl')

router.get('/getbar/:name', drinkCtrl.drinks.getInitdrinks)

module.exports = router
