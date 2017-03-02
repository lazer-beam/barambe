const Promise = require('bluebird')

const ordersUtil = require('../utilities/ordersUtil')

const orders = {
  get: (req, res) => {
    ordersUtil.getAllPendingOrders()
      .then(pendingOrders => {
        res.send(pendingOrders)
      }).catch(err => {
        res.status(500).send(err)
      })
  },
  close: (req, res) => {
    ordersUtil.closeOrder(req.params.id)
      .then(closedId => {
        res.send(`Successfully closed order ${closedId}`)
      }).catch(err => {
        res.status(500).send(err)
      })
  },
  post: (req, res) => {
    ordersUtil.createOrder(req.body.drinkName, req.body.tabId)
      .then(order => {
        ordersUtil.sendBartenderNewOrder(order)
        res.send(`Successfully created order ${order.dataValues.id}`)
      }).catch(err => {
        res.status(500).send(err)
      })
  },
  closeMultiple: (req, res) => {
    const ordersToClose = req.body

    Promise.all(ordersToClose.map(order => ordersUtil.closeOrder(order.id)))
      .then(() => {
        res.send(`Successfully closed ${ordersToClose.length} orders`)
      }).catch(err => {
        res.status(500).send(err)
      })
  },
}

module.exports = {
  orders,
}
