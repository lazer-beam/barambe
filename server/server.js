require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const chalk = require('chalk')

const socketHub = require('./sockets')
const initDb = require('../db/config')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, '/../app/build')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
require('./routes')(app)

app.get('/test', (req, res) => {
  res.status(200).send('Hello World!')
})

io.on('connection', socket => socketHub(socket))

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
