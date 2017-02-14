const Sequelize = require('sequelize')
const chalk = require('chalk')

const opts = {
  dialect: 'postgres',
  ssl: true,
  dialectOptions: { ssl: { require: true } },
}
const sequelize = new Sequelize(process.env.DB_CONNECTION, opts)

sequelize.authenticate().then(msg => {
  console.log(chalk.green('Connection has been established successfully'))
  console.log(msg)
}).catch(err => {
  console.log(chalk.red('Unable to connect to database'))
  console.log(err)
})

module.exports = sequelize
