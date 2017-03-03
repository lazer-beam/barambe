require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const chalk = require('chalk')
const cors = require('cors')

const initDb = require('../db/config')
const mongoose = require('../dbGlobal/config')

const app = require('./appInstance')
const http = require('./httpServer')

app.use(express.static(path.join(__dirname, '/../app/build')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
require('./routes')(app)

app.get('/test', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '/../app/public/index.html'))
})

const dbStr = process.env.DB_TESTING === 'true' ? 'USING TESTING DATABASE' : 'USING DEVELOPMENT DATABASE'
const port = 1337

Promise.all([initDb(false), mongoose()]).then(() => {
  http.listen(process.env.PORT || port, () => {
    console.log(chalk.bgGreen.black(dbStr))
    console.log(chalk.bgGreen.black(`listening on port ${port}`))
  })
}).catch(err => console.log(err))

module.exports = http
