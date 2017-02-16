const Promise = require('bluebird')
const request = require('supertest')
const expect = require('chai').expect

const app = require('../server/server.js')
const AddIn = require('../db/models/addInModel')
const Drink = require('../db/models/drinkModel')
const Liquor = require('../db/models/liquorModel')
const Order = require('../db/models/orderModel')
const Tab = require('../db/models/tabModel')

const drinksUtil = require('../server/utilities/drinksUtil')

describe('Drinks Helpers Functionality', () => {
  var createdLines = []

  before(() => {
    return Drink.create({
      type: 'shot',
      name: 'Greygoose',
      price: 800
    }).bind({}).then(drink => {
      createdLines.push(drink)
      this.cocktailDrink = drink
      return Tab.create({
        customerNum: 15,
        isOpen: true,
      })
    }).then(tab => {
      createdLines.push(tab)
      this.tab = tab;
      return Order.create({ status: 'pending'})
    }).then(order => {
      createdLines.push(order)
      this.order = order
      return this.cocktailDrink.addOrder(order)
    }).then(() => {
      return this.tab.addOrder(this.order)
    }).then(() => {
      return Liquor.create({ name: 'Greygoose' })
    }).then(liquor => {
      createdLines.push(liquor)
      return this.cocktailDrink.addLiquor(liquor)
    })
  })

  after(() => {
    return Promise.each(createdLines, line => {
      return line.destroy()
    })
  })

  it('should get one cocktail drink associated with one order', () => {

  })
})