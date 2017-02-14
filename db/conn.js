const Sequelize = require('sequelize')
const chalk = require('chalk')

const opts = {
  dialect: 'postgres',
  ssl: true,
  dialectOptions: { ssl: { require: true } },
  logging: false,
}
const sequelize = new Sequelize(process.env.DB_CONNECTION, opts)

sequelize.authenticate().then(() => {
  console.log(chalk.bgCyan.black('Connection to DB has been established successfully'))
}).catch(err => {
  console.log(chalk.red('Unable to connect to database'))
  console.log(err)
})

module.exports = sequelize
