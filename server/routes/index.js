const ordersRoutes = require('./ordersRoutes')
const drinksRoutes = require('./drinksRoutes')
const tabRoutes = require('./tabRoutes')
const barRoutes = require('./barRoutes')

module.exports = app => {
  app.use('/orders', ordersRoutes)
  app.use('/drinks', drinksRoutes)
  app.use('/tabs', tabRoutes)
  app.use('/bars', barRoutes)
}
