const Sequelize = require('sequelize')
const sequelize = require('../conn')

const schema = {
  customerName: Sequelize.STRING,
  isOpen: { type: Sequelize.BOOLEAN, defaultValue: true },
  tableNum: Sequelize.INTEGER,
  subtotal: Sequelize.INTEGER,
  tax: Sequelize.INTEGER,
  tip: Sequelize.INTEGER,
}

const config = {
  timestamps: true,
  updatedAt: false,
  createdAt: 'time',
}

module.exports = sequelize.define('tab', schema, config)
