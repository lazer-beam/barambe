const Order = require('../../db/models/orderModel')

const mapOrders = orders => orders.map(order => order.dataValues)
const getAllOrdersWithStatusOpen = orders => orders.filter(order => order.status === 'open')

const getOrders = () => Order.findAll().then(orders => getAllOrdersWithStatusOpen(mapOrders(orders)))


module.exports = {
  getOrders,
  mapOrders,
  getAllOrdersWithStatusOpen,
}
