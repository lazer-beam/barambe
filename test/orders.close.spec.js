const expect = require('chai').expect
const Promise = require('bluebird')

const app = require('../server/server.js')
const request = require('supertest')(app)
const Order = require('../db/models/orderModel')
const ordersUtil = require('../server/utilities/ordersUtil')

describe('Closing Orders Functionality', () => {
  let createdLines = []
  let mockOrder;
  
  beforeEach(() => {
    return Order.create({})
      .then(order => {
        createdLines.push(order)
        mockOrder = order.dataValues
      })
  })

  afterEach(() => Promise.each(createdLines, line => line.destroy()))

  it('should set an order to status closed', () => {
    return Order.findOne({ where: { id: mockOrder.id}})
      .then(order => {
        expect(order.dataValues.status).to.be.equal('pending')
        return ordersUtil.closeOrder(mockOrder.id)
      }).then(closedId => {
        expect(closedId).to.be.equal(mockOrder.id)
        return Order.findOne({ where: { id: mockOrder.id}})
      }).then(order => {
        expect(order.dataValues.status).to.be.equal('closed')
      })
  })

  it('should set an order to status closed when PUT /orders/closeorder/:id', () => {
    return request
      .put('/orders/closeorder/' + mockOrder.id)
      .expect(res => {
        expect(res.text).to.be.equal(`Successfully closed order ${mockOrder.id}`)
        Order.findOne({ where: { id: mockOrder.id}})
          .then(order => {
            expect(order.dataValues.status).to.be.equal('closed')
          })
      })
  })
})