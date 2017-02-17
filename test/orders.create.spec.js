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


  it('should add a beer order to a tab', () => {
    const mockBeerDrink = {
      type: 'beer',
      name: 'Blue Moon',
      price: 750
    }

    ordersUtil.createOrder(mockBeerDrink)
      .then(createdOrder => {
        expect(createdOrder).to.be.ok
      })
  })

  it('should add a shot order to a tab', () => {
    const mockShotDrink = {
      type: 'shot'
    }

    ordersUtil.createOrder()
      .then(createdOrder => {
        expect(createdOrder).to.be.ok
      })
  })

  it('should add a cocktail order to a tab', () => {
    const mockBeerDrink = {
      type: 'cocktail'
    }

    ordersUtil.createOrder()
      .then(createdOrder => {
        expect(createdOrder).to.be.ok
      })
  })
})