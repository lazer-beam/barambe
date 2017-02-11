const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = require('./routes');

const app = express();
const port = 1337;

app.use(express.static(__dirname + '/../app/build'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(port, () => {
  console.log('listening on port ', port);
});

require('./routes')(app);
module.exports = app
