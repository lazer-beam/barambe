const Promise = require('bluebird')
const sequelize = require('./conn')

const AddIn = require('./models/addInModel')
const Drink = require('./models/addInModel')
const Liquor = require('./models/addInModel')
const Order = require('./models/addInModel')
const Tab = require('./models/addInModel')

module.exports = () => new Promise((resolve, reject) => {
  Tab.hasMany(Order)
  Order.belongsTo(Tab)

  Drink.hasMany(Order)
  Order.belongsTo(Drink)

  Drink.belongsToMany(AddIn, { through: 'drink_addIn' })
  AddIn.belongsToMany(Drink, { through: 'drink_addIn' })

  Drink.belongsToMany(Liquor, { through: 'drink_liquor' })
  Liquor.belongsToMany(Drink, { through: 'drink_liquor' })

  sequelize.sync(/*{force: true}*/).then(err => {
    resolve()
    reject(err)
  })
})
