const barsHelper = require('../utilities/barUtil')

const bars = {
  get: (req, res) => {
    const name = req.params.name
    const bar = barsHelper.getBar(name)
    res.send(bar)
  },
}

module.exports = {
  bars,
}
