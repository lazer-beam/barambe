const expect = require('chai').expect
const Promise = require('bluebird')

require('../server/server')
const Tab = require('../db/models/tabModel')
const ordersUtil = require('../server/utilities/ordersUtil')

describe('Adding an Order functionality', () => {
  let createdLines = []
  let mockTab;

  beforeEach(() => {
    return Tab.create({ customerNum: 3 })
      .then(tab => {
        createdLines.push(tab)
        mockTab = tab.dataValues.id
      })
  })

  afterEach(() => Promise.each(createdLines, line => line.destroy()))


  it.only('should add an order to a tab', () => {
    ordersUtil.createOrder()
      .then(createdOrder => {
        expect(createdOrder).to.be.ok
      })
  })
})