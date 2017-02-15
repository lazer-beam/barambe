const Promise = require('bluebird')

const expect = require('chai').expect
const app = require('../server/server.js')
const barsHelper = require('../server/utilities/barUtil')

const AddIn = require('../db/models/addInModel')
const Drink = require('../db/models/drinkModel')
const Liquor = require('../db/models/liquorModel')
const Order = require('../db/models/orderModel')
const Tab = require('../db/models/tabModel')

var port = 1337
var url = 'http://127.0.0.1:' + port
const request = require('supertest')(url)

describe('Orders Server Functionality', () => {
  var createdLines = []

  beforeEach(() => {
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
          isTable: false
        })
      }).then(tab => {
        createdLines.push(tab)
        this.tab = tab;
        return Order.create({ status: 'open'})
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

  afterEach(() => {
    return Promise.reduce(createdLines, function(_, line) {
      console.log('line', line.dataValues)
      // return line.destroy()
    }, null);
  })

  xit('Should get all the orders when hitting the endpoint /orders/getallpending', () => {
    setTimeout(() => {
      request
        .get('/orders/getallpending')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          // expect(res.body.orders.length).to.equal(2)
        })
        .end(done) //use done to tell mocha that async test is done
    }, 0)
  })
})