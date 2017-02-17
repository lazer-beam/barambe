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
}

module.exports = {
  orders,
}
