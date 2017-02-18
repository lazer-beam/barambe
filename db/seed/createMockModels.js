require('dotenv').config()
const Promise = require('bluebird')
const initDb = require('../config')
const Drink = require('../models/drinkModel')
const Liquor = require('../models/liquorModel')
const AddIn = require('../models/addInModel')

const beers = ['Miller Lite', 'Bud Light', 'Blue Moon', 'Arrogant Basterd Ale', 'Sierra Nevada',
  'Lagunitas', 'Heineken', 'Pabst Blue Ribbon', 'Sapporo', 'Hite']
const vodkas = ['Greygoose', 'Absolut Vodka', 'Ciroc', 'Svedka', 'Stolichnaya']
const rums = ['Bacardi', 'Captain Morgan', 'Havana Club', 'Cacique']
const gins = ['Bombay Sapphire', 'Beefeater Gin', 'Plymouth', 'Citadelle']
const brandys = ['Remy Martin', 'Hennessy']
const scotches = ['Johnnie Walker', 'Chivas Regal']
const bourbons = ['Old Crow', 'Eagle Rare']
const shots = vodkas.concat(rums).concat(gins).concat(brandys).concat(scotches).concat(bourbons)
const prices = [650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250]

module.exports = cocktails => {
  return initDb(true)
    .then(() => {
      console.log('Creating cocktail models')
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
      }).then(() => {
        console.log('Creating beer models')
        return Promise.all(beers.map(beer => {
          return Drink.create({
            type: 'beer',
            name: beer,
            price: prices[Math.floor(Math.random() * prices.length)],
          })
        }))
      }).then(() => {
        console.log('Creating shot models')
        return Promise.all(shots.map(shot => Drink.create({
          type: 'shot',
          name: shot,
          price: prices[Math.floor(Math.random() * prices.length)],
        }))).then(createdShots => Promise.all(createdShots.map(shot => {
          return Liquor.findOne({ where: { name: shot.dataValues.name } })
            .then(foundLiquor => {
              if (!foundLiquor) {
                return Liquor.create({ name: shot.dataValues.name })
                  .then(createdLiquor => {
                    return shot.addLiquor(createdLiquor)
                  })
              }
              return shot.addLiquor(foundLiquor)
            })
        })))
      })
    })
}
