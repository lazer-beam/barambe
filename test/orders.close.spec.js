const expect = require('chai').expect
const Promise = require('bluebird')

require('../server/server.js')
const Order = require('../db/models/orderModel')
const ordersUtil = require('../server/utilities/ordersUtil')

describe('Closing Orders Functionality', () => {
  let createdLines = []
  let mockOrder;
  
  before(() => {
    return Order.create({})
      .then(order => {
        createdLines.push(order)
        mockOrder = order
      })
  })

  after(() => Promise.each(createdLines, line => line.destroy()))

  it('should set an order to status closed', () => {
    return ordersUtil.closeOrder(mockOrder.dataValues.id)
      .then(() => {
        return Order.findAll()
      }).then(orders => {
         expect(orders).to.have.length(0)
      })
  })
})