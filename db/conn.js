const Sequelize = require('sequelize')
const chalk = require('chalk')

const opts = {
  dialect: 'postgres',
  ssl: true,
  dialectOptions: { ssl: { require: true } },
  logging: false,
}

const mode = (process.env.DB_TESTING === 'true') ? process.env.DB_CONN_TEST : process.env.DB_CONNECTION

const sequelize = new Sequelize(mode, opts)

sequelize.authenticate().then(() => {
  console.log(chalk.bgCyan.black('Connection to DB has been established successfully'))
}).catch(err => {
  console.log(chalk.red('Unable to connect to database'))
  console.log(err)
})

module.exports = sequelize
