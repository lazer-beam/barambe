const Sequelize = require('sequelize')
const sequelize = require('../conn')

const schema = {
  type: Sequelize.STRING,
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
}

module.exports = sequelize.define('drink', schema, { timestamps: false })
