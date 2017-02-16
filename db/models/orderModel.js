const Sequelize = require('sequelize')
const sequelize = require('../conn')

const schema = {
  status: { type: Sequelize.STRING, defaultValue: 'pending' },
}

const config = {
  timestamps: true,
  updatedAt: false,
  createdAt: 'time',
}

module.exports = sequelize.define('order', schema, config)
