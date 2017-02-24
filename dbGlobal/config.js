const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const CustomerSchema = require('./Customer')
const BarSchema = require('./Bar')

const options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000,
    },
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000,
    },
  },
}

mongoose.model('Customer', CustomerSchema)
mongoose.model('Bar', BarSchema)

module.exports = () => mongoose.connect(process.env.DBG_CONN, options)
