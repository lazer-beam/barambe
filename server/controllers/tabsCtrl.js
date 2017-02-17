const tabsUtil = require('../utilities/tabsUtil')

const tabs = {
  open: (req, res) => {
    tabsUtil.openTab()
      .then(() => {
        res.send()
      })
  },
}

module.exports = {
  tabs,
}
