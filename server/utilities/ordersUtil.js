const Order = require('../../db/models/orderModel')
const Tab = require('../../db/models/tabModel')
const drinksUtil = require('./drinksUtil')

const mapOrdersToDataValues = orders => orders.map(order => order.dataValues)

const getAllOrdersWithStatusOpen = orders => orders.filter(order => order.status === 'pending')

const isTableOrPickup = tabId => {
  return Tab.findOne({ where: { id: tabId } }).then(tab => tab.dataValues.tableNum)
}

const addDeliveryType = orders => {
  return Promise.all(orders.map(order => {
    return isTableOrPickup(order.tabId)
      .then(tableNum => {
        tableNum ? order.tableNum = tableNum : order.pickup = true
        return order
      })
  }))
}

const getOrders = () => Order.findAll()
  .then(orders => {
    return addDeliveryType(mapOrdersToDataValues(orders))
  }).then(orders => {
    return getAllOrdersWithStatusOpen(orders)
  }).then(orders => {
    return drinksUtil.getAllDrinks(orders)
  })

module.exports = {
  getOrders,
  getAllOrdersWithStatusOpen,
  addDeliveryType,
  isTableOrPickup,
}
