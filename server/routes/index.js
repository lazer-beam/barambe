const ordersRoutes = require('./ordersRoutes')
const drinksRoutes = require('./drinksRoutes')
const tabRoutes = require('./tabRoutes')
const authRoutes = require('./authRoutes')
const barRoutes = require('./barRoutes')

module.exports = app => {
  app.use('/auth', authRoutes)
  app.use('/orders', ordersRoutes)
  app.use('/drinks', drinksRoutes)
  app.use('/tabs', tabRoutes)
  app.use('/bars', barRoutes)
}
