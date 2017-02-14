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
require('./routes')(app)

app.use(express.static(path.join(__dirname, '/../app/build')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/test', (req, res) => {
  res.status(200).send('Hello World!')
})

io.on('connection', socket => socketHub(socket))

const port = 1337
initDb().then(() => {
  http.listen(port, () => {
    console.log(chalk.bgGreen.black(`listening on port ${port}`))
  })
}).catch(err => {
  console.log(chalk.red('Database Error'))
  console.error(err)
})

module.exports = http
