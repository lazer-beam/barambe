const Sequelize = require('sequelize')
const sequelize = require('../conn')

const schema = {
  type: Sequelize.STRING,
  status: Sequelize.STRING,
}

const config = {
  timestamps: true,
  updatedAt: false,
  createdAt: 'time',
}

module.exports = sequelize.define('order', schema, config)
