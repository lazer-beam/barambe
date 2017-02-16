const Drink = require('../../db/models/drinkModel')

const getAllDrinks = orders => Promise.all(orders.map(order => Drink.findOne({ where: { id: order.drinkId } })))

module.exports = {
  getAllDrinks,
}
