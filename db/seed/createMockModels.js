require('dotenv').config()
const Promise = require('bluebird')
const initDb = require('../config')
const Drink = require('../models/drinkModel')
const Liquor = require('../models/liquorModel')
const AddIn = require('../models/addInModel')

module.exports = cocktails => {
  return initDb(true)
    .then(() => {
      return Promise.each(cocktails, cocktail => {
        return Drink.create({
          type: 'cocktail',
          name: cocktail.Name,
          price: cocktail.price,
        }).then(createdDrink => {
          this.drink = createdDrink
          return Promise.all(cocktail.liquors.map(liquor => {
            return Liquor.findOne({ where: { name: liquor } })
              .then(foundLiquor => {
                if (!foundLiquor) {
                  return Liquor.create({ name: liquor })
                    .then(createdLiquor => {
                      return this.drink.addLiquor(createdLiquor)
                    })
                }
                return this.drink.addLiquor(foundLiquor)
              })
          }))
        })
        .then(() => Promise.all(cocktail.addIns.map(addIn => addIn.trim() !== '' && AddIn.create({ name: addIn }))))
        .then(addIns => Promise.all(addIns.map(addIn => addIn !== true && this.drink.addAddIn(addIn))))
      })
    })
}
