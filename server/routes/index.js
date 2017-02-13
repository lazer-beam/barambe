const barRoutes = require('./barRoutes')

module.exports = app => {
  app.use('/bar', barRoutes)
}
