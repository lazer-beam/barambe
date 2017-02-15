const Order = require('../../db/models/orderModel')
const Tab = require('../../db/models/tabModel')

const mapOrders = orders => orders.map(order => order.dataValues)

const getAllOrdersWithStatusOpen = orders => orders.filter(order => order.status === 'open')

const isTableOrPickup = tabId => {
  return Tab.findOne({ where: { id: tabId } }).then(tab => tab.dataValues.tableNumber)
}

const addDeliveryType = orders => {
  return Promise.all(orders.map(order => {
    return isTableOrPickup(order.id)
      .then(tableNum => {
        tableNum ? order.tableNum = tableNum : order.pickup = true
        return order
      })
  }))
}

const getOrders = () => Order.findAll()
  .then(orders => {
    return addDeliveryType(mapOrders(orders))
  }).then(orders => {
    return getAllOrdersWithStatusOpen(orders)
  })

module.exports = {
  getOrders,
  mapOrders,
  getAllOrdersWithStatusOpen,
  addDeliveryType,
  isTableOrPickup,
}
