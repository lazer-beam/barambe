const Sequelize = require('sequelize')
const sequelize = require('../conn')

const schema = {
  name: Sequelize.STRING,
  subDomain: Sequelize.STRING,
  isOpen: Sequelize.BOOLEAN,
  lastCall: Sequelize.TIME,
}

const configs = { timestamps: false }

const Bar = sequelize.define('bar', schema, configs)

module.exports = Bar
