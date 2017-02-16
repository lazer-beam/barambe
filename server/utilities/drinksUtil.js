const Drink = require('../../db/models/drinkModel')

const getAllDrinks = orders => Promise.all(orders.map(order => Drink.findOne({ where: { id: order.drinkId } })))

const formatDrinks = drinks => {
  delete drinks.id
}

module.exports = {
  getAllDrinks,
  formatDrinks,
}
