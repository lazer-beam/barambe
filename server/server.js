require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const chalk = require('chalk')

const initDb = require('../db/config')

const app = require('./appInstance')
const http = require('./httpServer')

app.use(express.static(path.join(__dirname, '/../app/build')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
require('./routes')(app)

app.get('/test', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '/../app/public/index.html'))
})

const port = 1337
initDb(false).then(() => {
  http.listen(port, () => {
    if (process.env.DB_TESTING === 'true') {
      console.log(chalk.bgGreen.black('USING TESTING DATABASE'))
    } else {
      console.log(chalk.bgGreen.black('USING DEVELOPMENT DATABASE'))
    }
    console.log(chalk.bgGreen.black(`listening on port ${port}`))
  })
})

module.exports = http
