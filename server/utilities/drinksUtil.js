const Drink = require('../../db/models/drinkModel')
const Promise = require('bluebird')

const getAllDrinks = orders => Promise.all(orders.map(order => Drink.findOne({ where: { id: order.drinkId } })))

const findDrinkByName = drinkName => Drink.findOne({ where: { name: drinkName } })

const getAllCocktails = drinkResults => {
  return Promise.all(drinkResults.map(drink => {
    const drinkObj = {
      name: drink.dataValues.name,
      price: drink.dataValues.price,
      type: drink.dataValues.type,
    }

    return drink.getLiquors()
      .then(liquors => {
        drinkObj.liquors = liquors.map(liquorObj => liquorObj.dataValues.name)
        return drink.getAddIns()
      }).then(addIns => {
        drinkObj.addIns = addIns.map(addInObj => addInObj.dataValues.name)
        return drinkObj
      }).catch(err => {
        console.log(err)
      })
  }))
}

const getDrinkType = drinkType => {
  return Drink.findAll({ where: { type: drinkType } })
  .then(drinkResults => {
    if (drinkType === 'cocktail') {
      return getAllCocktails(drinkResults)
    }
    return drinkResults.map(drink => {
      const drinkObj = {
        name: drink.dataValues.name,
        price: drink.dataValues.price,
        type: drinkType,
      }
      return drinkObj
    })
  })
}

module.exports = {
  getAllDrinks,
  findDrinkByName,
  getDrinkType,
}
