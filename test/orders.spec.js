const expect = require('chai').expect

require('../server/server.js')
const Drink = require('../db/models/drinkModel')
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
        expect(order.tableNum).to.be.equal(0)
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
      expect(tableNum).to.be.equal(0)
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