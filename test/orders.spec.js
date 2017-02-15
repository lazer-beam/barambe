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
      return line.destroy()
    }, null);
  })

  xit('Should get all orders', () => {
    ordersUtil.getOrders()
      .then(orders => {
        console.log('orders in spec', orders)
      })
  })

  it('should get only the orders with status equal to open', () => {
    let orders = ordersUtil.getAllOrdersWithStatusOpen([
      { id: 1,
      status: 'open',
      time: '2017-02-15T09:02:35.703Z',
      tabId: 1,
      drinkId: 1
    },
      { id: 2,
      status: 'closed',
      time: '2017-02-15T09:02:35.703Z',
      tabId: 2,
      drinkId: 2
    }])

    expect(orders.length).to.equal(1)
    expect(orders[0]).to.be.an('object')
    expect(orders[0]).to.have.all.keys('id', 'time', 'tabId', 'drinkId', 'status')
    expect(orders[0].id).to.equal(1)
  })

  xit('Should get all the orders when hitting the endpoint /orders/getallpending', () => {
    return request(app)
      .get('/orders/getallpending')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        // expect(res.body.orders.length).to.equal(2)
      })
      .end(done) //use done to tell mocha that async test is done
  })
})