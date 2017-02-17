const Drink = require('../../db/models/drinkModel')

const getAllDrinks = orders => Promise.all(orders.map(order => Drink.findOne({ where: { id: order.drinkId } })))

const findDrinkByName = drinkName => Drink.findOne({ where: { name: drinkName } })

module.exports = {
  getAllDrinks,
  findDrinkByName,
}
