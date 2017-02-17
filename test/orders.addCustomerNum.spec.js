const expect = require('chai').expect
const Promise = require('bluebird')

require('../server/server.js')
const Order = require('../db/models/orderModel')
const Tab = require('../db/models/tabModel')
const ordersUtil = require('../server/utilities/ordersUtil')

describe('Add Customer Number: ', () => {
  let createdLines = []
  let orderModels = []
  let customerNum = 675

  before(() => {
    return Promise.all([Order.create({}), Order.create({})])
      .then(orders => {
        this.orders = orders
        return Tab.create({ customerNum: customerNum })
      }).then(tab => {
        createdLines.push(tab)
        return Promise.all(this.orders.map(order => {
          createdLines.push(order)
          orderModels.push(order)
          return order.setTab(tab)
        }))
      })
  })

  after(() => Promise.each(createdLines, line => line.destroy()))

  it('should add a customerNum to an array of orders', () => {
    return ordersUtil.addCustomerNumToOrders(orderModels)
      .then(orders => {
        orders.forEach(order => {
          expect(order.customerNum).to.be.equal(675)
        })
      })
  })
})