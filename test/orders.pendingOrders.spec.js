const Promise = require('bluebird')
const expect = require('chai').expect

const app = require('../server/server.js')
const request = require('supertest')(app)

const AddIn = require('../db/models/addInModel')
const Drink = require('../db/models/drinkModel')
const Liquor = require('../db/models/liquorModel')
const Order = require('../db/models/orderModel')
const Tab = require('../db/models/tabModel')
const ordersUtil = require('../server/utilities/ordersUtil')

describe('Orders Server Functionality', () => {
  var createdLines = []
  var drinks = []

  before(() => {
    //create one beer, one shot, one cocktail, three orders, and two tabs
    return Drink.create({
      type: 'beer',
      name: 'Natural Lite',
      price: 550
    }).then(drink => {
      createdLines.push(drink)
      drinks.push(drink.dataValues)
      this.beer = drink
      return Drink.create({
        type: 'shot',
        name: 'Absolut Vodka',
        price: 800
      })
    }).then(drink => {
      createdLines.push(drink)
      drinks.push(drink.dataValues)
      this.shot = drink
      return Liquor.create({ name: 'Absolut Vodka' })
    }).then(liquor => {
      createdLines.push(liquor)
      this.absolut = liquor
      return this.shot.addLiquor(liquor)
    }).then(() => {
      return Drink.create({
        type: 'cocktail',
        name: 'Yuriy\'s Special',
        price: 1300
      })
    }).then(drink => {
      createdLines.push(drink)
      drinks.push(drink.dataValues)
      this.cocktail = drink
      return drink.addLiquor(this.absolut)
    }).then(() => Liquor.create({ name: 'Smirnoff' }))
    .then(liquor => {
      createdLines.push(liquor)
      return this.cocktail.addLiquor(liquor)
    }).then(() => AddIn.create({ name: 'Salt' }))
    .then(addIn => {
      createdLines.push(addIn)
      return this.cocktail.addAddIn(addIn)
    }).then(() => AddIn.create({ name: 'Olives' }))
    .then(addIn => {
      createdLines.push(addIn)
      this.cocktail.addAddIn(addIn)
    }).then(() => {
      return Tab.create({ tableNum: 7 })
    })
    .then(tab => {
      this.tab = tab;
      createdLines.push(tab)
      return Promise.all([Order.create({}), Order.create({}), Order.create({})])
    }).then(orders => {
      this.beer.addOrder(orders[0])
      this.shot.addOrder(orders[1])
      this.cocktail.addOrder(orders[2])
      orders.forEach(order => {
        createdLines.push(order)
        this.tab.addOrder(order)
      })
      return Drink.create({
        type: 'beer',
        name: 'Johns Beer',
        price: 1000
      })
    }).then(drink => {
      createdLines.push(drink)
      drinks.push(drink.dataValues)
      this.johnsBeer = drink
      return Order.create({})
    }).then(order => {
      createdLines.push(order)
      this.johnsBeer.addOrder(order)
      this.tab.addOrder(order)
    })
  })

  after(() => Promise.each(createdLines, line => line.destroy()))

  it('Should get all orders', function() {
    this.retries(3)
    return ordersUtil.getAllPendingOrders()
      .then(orders => {
        orders.forEach(order => {
          expect(order.drink).to.be.ok
          expect(order.id).to.be.ok
          expect(order.time).to.be.ok
          expect(order.tabId).to.be.ok
          expect(order.tableNum).to.be.equal(7)
          if (order.drink.type === 'shot' || order.drink.type === 'cocktail') {
            expect(order.drink.liquors).to.be.ok
            expect(order.drink.liquors).to.be.an.instanceOf(Array)
            expect(order.drink.liquors).to.have.length.greaterThan(0)
          } else if(order.drink.type === 'cocktail') {
            expect(order.drink.addIns).to.be.ok
            expect(order.drink.addIns).to.be.an.instanceOf(Array)
            expect(order.drink.addIns).to.have.length.greaterThan(0)
          }
        })
      })
  })

  it('Should get all the orders when hitting the endpoint /orders/getallpending', () => {
    return request
      .get('/orders/getallpending')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        const orders = res.body
        orders.forEach(order => {
          expect(order.drink).to.be.ok
          expect(order.id).to.be.ok
          expect(order.time).to.be.ok
          expect(order.tabId).to.be.ok
          expect(order.tableNum).to.be.equal(7)
          if (order.drink.type === 'shot' || order.drink.type === 'cocktail') {
            expect(order.drink.liquors).to.be.ok
            expect(order.drink.liquors).to.be.an.instanceOf(Array)
            expect(order.drink.liquors).to.have.length.greaterThan(0)
          } else if(order.drink.type === 'cocktail') {
            expect(order.drink.addIns).to.be.ok
            expect(order.drink.addIns).to.be.an.instanceOf(Array)
            expect(order.drink.addIns).to.have.length.greaterThan(0)
          }
        })
      })
  })
})