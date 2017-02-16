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
}

module.exports = {
  orders,
}
