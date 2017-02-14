const Sequelize = require('sequelize')
const sequelize = require('../conn')

const schema = {
  name: Sequelize.STRING,
  subDomain: Sequelize.STRING,
  isOpen: Sequelize.BOOLEAN,
  lastCall: Sequelize.TIME,
}

module.exports = sequelize.define('bar', schema, { timestamps: false })
