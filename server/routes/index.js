module.exports = app => {
  app.use('/bar', require('./barRoutes'))
};