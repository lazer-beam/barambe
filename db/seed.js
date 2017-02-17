const fs = require('fs')
const Promise = require('bluebird')
const path = require('path')

Promise.promisifyAll(fs)
fs.readFileAsync(path.join(__dirname, '../cocktails.json'), 'utf8')
  .then(cocktails => {
    const cocktailsObj = JSON.parse(cocktails)
    console.log('cocktailsObj.length', cocktailsObj.length)
  })
