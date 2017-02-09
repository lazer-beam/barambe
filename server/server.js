const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 1337;

app.use(express.static('/Users/ejm/Desktop/bar-lord/app/build'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(port, () => {
  console.log('listening on port ', port);
});

module.exports = app;
