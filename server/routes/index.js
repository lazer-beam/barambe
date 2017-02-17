const ordersRoutes = require('./ordersRoutes')
const drinksRoutes = require('./drinksRoutes')
const tabRoutes = require('./tabRoutes')

module.exports = app => {
  app.use('/orders', ordersRoutes)
  app.use('/drinks', drinksRoutes)
  app.use('/tabs', tabRoutes)
}
