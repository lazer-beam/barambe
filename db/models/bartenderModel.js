const Sequelize = require('sequelize')
const sequelize = require('../conn')

const schema = {
  password: Sequelize.STRING,
  isAdmin: Sequelize.BOOLEAN,
}

module.export = sequelize.define('bartender', schema, { timestamps: false })
