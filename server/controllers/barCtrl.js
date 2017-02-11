const barsHelper = require('../utilities/barUtil')

var bars = {
  get: (req, res) => {
    console.log('Serving request for ' + req.method + ' where url is: ' + req.url)
    
    let name = req.params.name
    let bar = barsHelper.getBar(name)
    res.send(bar)
  }
}

module.exports = {
  bars: bars
}