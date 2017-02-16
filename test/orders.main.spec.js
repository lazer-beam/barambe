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

  xit('Should get all orders', () => {
    ordersUtil.getOrders()
      .then(orders => {
        console.log('orders in spec', orders)
      })
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

//Intuition how to create mock table data
//  var createdLines = []

//   beforeEach(() => {
//     return Drink.create({
//       type: 'shot',
//       name: 'Greygoose',
//       price: 800
//     }).bind({}).then(drink => {
//       createdLines.push(drink)
//       this.cocktailDrink = drink
//       return Tab.create({
//         customerNum: 15,
//         isOpen: true,
//       })
//     }).then(tab => {
//       createdLines.push(tab)
//       this.tab = tab;
//       return Order.create({ status: 'pending'})
//     }).then(order => {
//       createdLines.push(order)
//       this.order = order
//       return this.cocktailDrink.addOrder(order)
//     }).then(() => {
//       return this.tab.addOrder(this.order)
//     }).then(() => {
//       return Liquor.create({ name: 'Greygoose' })
//     }).then(liquor => {
//       createdLines.push(liquor)
//       return this.cocktailDrink.addLiquor(liquor)
//     })
//   })

//   afterEach(() => {
//     return Promise.each(createdLines, line => {
//       return line.destroy()
//     })
//   })