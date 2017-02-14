const Sequelize = require('sequelize')
const sequelize = require('../conn')

const schema = {
  password: Sequelize.STRING,
  isAdmin: Sequelize.BOOLEAN,
}

module.exports = sequelize.define('user', schema, { timestamps: false })
