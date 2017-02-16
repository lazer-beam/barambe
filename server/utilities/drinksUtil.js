const Drink = require('../../db/models/drinkModel')

const getAllDrinks = orders => {
  return Promise.all(orders.map(order => Drink.findAll({ where: { id: order.drinkId } })))
    .then(drinks => {
      console.log('drinks', drinks)
    })
}

module.exports = {
  getAllDrinks,
}
