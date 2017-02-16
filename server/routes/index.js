const ordersRoutes = require('./ordersRoutes')
const drinksRoutes = require('./drinksRoutes')

module.exports = app => {
  app.use('/orders', ordersRoutes)
  app.use('/drinks', drinksRoutes)
}
