const router = require('express').Router()
const drinkCtrl = require('../controllers/drinkCtrl')

// router.get('/getbar/:name', drinkCtrl.drinks.getInitdrinks)
router.get('/getAll', drinkCtrl.drinks.getAllDrinks)
router.post('/addToMenu', drinkCtrl.drinks.addToMenu)
router.post('/deleteItem', drinkCtrl.drinks.deleteItem)

module.exports = router
