const barsHelper = require('../utilities/barUtil')

const bars = {
  get: (req, res) => {
    console.log(`Serving request for ${req.method} where url is ${req.url}`)
    const name = req.params.name
    const bar = barsHelper.getBar(name)
    res.send(bar)
  },
}

module.exports = {
  bars,
}
