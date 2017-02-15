const barRoutes = require('./barRoutes')
const ordersRoutes = require('./ordersRoutes')

module.exports = app => {
  app.use('/bar', barRoutes)
  app.use('/orders', ordersRoutes)
}
