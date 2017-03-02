const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

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

module.exports = () => mongoose.connect(process.env.DBG_CONN, options)
