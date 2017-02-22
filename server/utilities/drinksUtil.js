const Drink = require('../../db/models/drinkModel')
const AddIn = require('../../db/models/addInModel')
const Liquor = require('../../db/models/liquorModel')
const Promise = require('bluebird')

const getAllDrinks = orders => Promise.all(orders.map(order => Drink.findOne({ where: { id: order.drinkId } })))

const findDrinkByName = drinkName => Drink.findOne({ where: { name: drinkName } })

const addToMenu = drinkObj => {
  console.log('addToMenu drinkObj: ', JSON.stringify(drinkObj))
  if (drinkObj.type === 'beer') {
    console.log('trying to add a beer')
    return Drink.create({
      name: drinkObj.name,
      type: 'beer',
      price: drinkObj.price,
    })
    .then(newDrink => newDrink)
  } else if (drinkObj.type === 'addIn') {
    return AddIn.create({
      name: drinkObj.name,
      price: drinkObj.price,
    })
    .then(newDrink => newDrink)
  } else if (drinkObj.type === 'liquor') {
    console.log('addToMenu drinkObj: ', JSON.stringify(drinkObj))
    return Liquor.create({
      name: drinkObj.name,
      price: drinkObj.price,
    }).then(newLiquor => {
      return Drink.create({
        name: drinkObj.name,
        price: drinkObj.price,
        type: 'shot',
      }).then(newDrink => {
        newDrink.addLiquor(newLiquor)
        return newDrink
      })
    })
  } else if (drinkObj.type === 'cocktail') {
    return Drink.create({
      name: drinkObj.name,
      type: 'cocktail',
      price: drinkObj.price,
    })
    .then(newDrink => {
      return Promise.all(drinkObj.liquors.map(liquorName => {
        return Liquor.findOne({ where: { name: liquorName } })
          .then(foundLiquor => foundLiquor.addDrink(newDrink))
      }))
      .then(() => {
        return Promise.all(drinkObj.addIns.map(addInName => {
          return AddIn.findOne({ where: { name: addInName } })
            .then(foundAddIn => foundAddIn.addDrink(newDrink))
        }))
      })
      .then(() => newDrink)
    })
  }
  return 'error'
}

const deleteItem = itemObj => {
  if (itemObj.type === 'beer' || itemObj.type === 'cocktail') {
    console.log('Beer in Util: ', itemObj)
    return Drink.findOne({ where: { name: itemObj.name } })
    .then(foundItem => {
      console.log('found a beer')
      return foundItem.destroy().then(() => 'Item deleted')
    })
  } else if (!itemObj.type) {
    return AddIn.findOne({ where: { name: itemObj.name } })
    .then(foundItem => {
      return foundItem.destroy()
    })
  } else if (itemObj.type === 'shot') {
    return Drink.findOne({ where: { name: itemObj.name } })
    .then(foundItem => {
      return foundItem.destroy()
    })
    .then(() => {
      return Liquor.findOne({ where: { name: itemObj.name } })
    })
    .then(foundItem => {
      return foundItem.destroy()
    })
  }
  return 'error'
}

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

const getAddIns = () => {
  return AddIn.findAll()
  .then(addInResults => {
    return addInResults.map(addIn => {
      const addInObj = {
        name: addIn.dataValues.name,
        price: addIn.dataValues.price,
      }
      return addInObj
    })
  })
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
  getAddIns,
  addToMenu,
  deleteItem,
}
