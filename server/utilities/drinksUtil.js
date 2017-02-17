const Drink = require('../../db/models/drinkModel')

const getAllDrinks = orders => Promise.all(orders.map(order => Drink.findOne({ where: { id: order.drinkId } })))

const createDrink = drink => {
  return Drink.create({
    name: drink.name,
    price: drink.price,
    type: drink.type,
  })
}

module.exports = {
  getAllDrinks,
  createDrink,
}
