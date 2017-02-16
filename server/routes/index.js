const barRoutes = require('./barRoutes')
const drinkRoutes = require('./drinkRoutes')

module.exports = app => {
  app.use('/bar', barRoutes)
  app.use('/drinks', drinkRoutes)
}
