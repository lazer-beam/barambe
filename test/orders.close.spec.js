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
        mockOrder = order.dataValues
      })
  })

  after(() => Promise.each(createdLines, line => line.destroy()))

  it('should set an order to status closed', () => {
    return Order.findOne({ where: { id: mockOrder.id}})
      .then(order => {
        expect(order.dataValues.status).to.be.equal('pending')
        return ordersUtil.closeOrder(mockOrder.id)
      }).then(() => Order.findOne({ where: { id: mockOrder.id}}))
      .then(order => {
        expect(order.dataValues.status).to.be.equal('closed')
      })
  })
})