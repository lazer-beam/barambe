const Promise = require('bluebird')
const request = require('supertest')
const expect = require('chai').expect

const app = require('../server/server.js')
const AddIn = require('../db/models/addInModel')
const Drink = require('../db/models/drinkModel')
const Liquor = require('../db/models/liquorModel')
const Order = require('../db/models/orderModel')
const Tab = require('../db/models/tabModel')
const ordersUtil = require('../server/utilities/ordersUtil')


describe('Orders With Tabs Functionality', () => {
   var mockOrders = []
   beforeEach(() => {
     mockOrders = [{ id: 1, status: 'pending', time: '2017-02-15T09:02:35.703Z', tabId: 1, drinkId: 1},
                   { id: 2, status: 'closed', time: '2017-02-15T09:02:35.703Z', tabId: 2, drinkId: 2}]
   })

  it('should get only the orders with status equal to open', () => {
    let orders = ordersUtil.getAllOrdersWithStatusOpen(mockOrders)

    expect(orders.length).to.equal(1)
    expect(orders[0]).to.be.an('object')
    expect(orders[0]).to.have.all.keys('id', 'time', 'tabId', 'drinkId', 'status')
    expect(orders[0].id).to.equal(1)
  })

  it('should add pickup delivery type to orders with no tableNum column with it\'s associated tab ', () => {
    return Tab.create({
      customerNum: 15,
      isOpen: true,
    }).bind({}).then(tab => {
      mockOrders = mockOrders.map(order => Object.assign(order, {tabId: tab.dataValues.id}))
      this.tab = tab
      return ordersUtil.addDeliveryType(mockOrders)
    }).then(orders => {
      orders.forEach(order => {
        expect(order.tableNum).to.be.not.ok
        expect(order.pickup).to.be.ok
        expect(order.pickup).to.be.equal(true)
      })
      this.tab.destroy()
    })
  })

  it('should add tableNum delivery type to orders with a tableNum column with it\'s associated tab ', () => {
    return Tab.create({
      customerNum: 15,
      isOpen: true,
      tableNum: 8
    }).bind({}).then(tab => {
      mockOrders = mockOrders.map(order => Object.assign(order, {tabId: tab.dataValues.id}))
      this.tab = tab
      return ordersUtil.addDeliveryType(mockOrders)
    }).then(orders => {
      orders.forEach(order => {
        expect(order.pickup).to.be.not.ok
        expect(order.tableNum).to.be.ok
        expect(order.tableNum).to.be.equal(8)
      })
      this.tab.destroy()
    })
  })

  it('should determine a tabs delivery type', () => {
    return Tab.create({
      customerNum: 15,
      isOpen: true,
    }).bind({}).then(tab => {
      this.tab = tab
      return ordersUtil.isTableOrPickup(tab.dataValues.id)
    }).then(tableNum => {
      expect(tableNum).to.be.a('null')
      expect(this.tab).to.be.ok
      return this.tab.destroy()
    }).then(() => {
      return Tab.create({
        customerNum: 15,
        isOpen: true,
        tableNum: 4,
      })
    }).then(tab => {
      this.tab = tab
      return ordersUtil.isTableOrPickup(tab.dataValues.id)
    }).then(tableNum => {
      expect(tableNum).to.be.a('number')
      expect(tableNum).to.be.equal(4)
      expect(this.tab).to.be.ok
      return this.tab.destroy()
    })
  })
})

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

  afterEach(() => Promise.each(createdLines, line => line.destroy()))

  it('Should get all orders', () => {
    return ordersUtil.getAllPendingOrders()
      .then(orders => {
        orders.forEach(order => {
          expect(order.drink).to.be.ok
          expect(order.id).to.be.ok
          expect(order.time).to.be.ok
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
    return request(app)
      .get('/orders/getallpending')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        const orders = res.body
        orders.forEach(order => {
          expect(order.drink).to.be.ok
          expect(order.id).to.be.ok
          expect(order.time).to.be.ok
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