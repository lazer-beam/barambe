require('dotenv').config()
const Promise = require('bluebird')
const chalk = require('chalk')
const initDb = require('../config')
const Drink = require('../models/drinkModel')
const Liquor = require('../models/liquorModel')
const AddIn = require('../models/addInModel')
const Tab = require('../models/tabModel')
const Order = require('../models/orderModel')


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
const tabs = [{ tableNum: 1, customerName: 'John' }, { tableName: 2, customerName: 'Jan' }, { tableName: 3, customerName: 'Joe' },
  { tableName: 4, customerName: 'Jack' }, { tableName: 5, customerName: 'Joanna' }, { tableName: 6, customerName: 'Josephine' },
  { customerName: 'Jorge' }, { customerName: 'Joaquin' }, { customerName: 'Jessica' }]

module.exports = cocktails => {
  return initDb(true)
    .then(() => {
      console.log(chalk.bgYellow.black('Creating cocktail models'))
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
        }).then(() => Promise.all(cocktail.addIns.map(addIn => addIn.trim() !== '' && AddIn.create({ name: addIn }))))
        .then(addIns => Promise.all(addIns.map(addIn => addIn !== true && this.drink.addAddIn(addIn))))
      }).then(() => {
        console.log(chalk.bgYellow.black('Creating beer models'))
        return Promise.all(beers.map(beer => {
          return Drink.create({
            type: 'beer',
            name: beer,
            price: prices[Math.floor(Math.random() * prices.length)],
          })
        }))
      }).then(() => {
        console.log(chalk.bgYellow.black('Creating shot models'))
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
    }).then(() => {
      console.log(chalk.bgYellow.black('Created tab models'))
      return Promise.all(tabs.map(tab => {
        return tab.tableNum ? Tab.create({ customerName: tab.customerName, tableNum: tab.tableNum })
                            : Tab.create({ customerName: tab.customerName, tableNum: 0 })
      }))
    }).then(tabsCreated => {
      console.log(chalk.bgYellow.black('Creating order models'))
      this.tabsCreated = tabsCreated
      return Promise.all([Order.create({}), Order.create({}), Order.create({}), Order.create({}), Order.create({}),
        Order.create({}), Order.create({}), Order.create({}), Order.create({}), Order.create({}),
        Order.create({}), Order.create({}), Order.create({}), Order.create({}), Order.create({}),
        Order.create({}), Order.create({}), Order.create({}), Order.create({}), Order.create({})])
    }).then(ordersCreated => Promise.all(ordersCreated.map(orderCreated => {
      return orderCreated.setTab(this.tabsCreated[Math.floor(Math.random() * this.tabsCreated.length)])
        .then(() => Drink.findAll())
        .then(drinks => orderCreated.setDrink(drinks[Math.floor(Math.random() * drinks.length)]))
    })))
}
