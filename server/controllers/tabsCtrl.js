const tabsUtil = require('../utilities/tabsUtil')

const tabs = {
  open: (req, res) => {
    tabsUtil.openTab(req.body.customerNum, req.body.tableNum)
      .then(tab => {
        res.send(`Created tab ${tab.dataValues.id}`)
      }).catch(err => {
        res.status(500).send(err)
      })
  },
  close: (req, res) => {
    tabsUtil.closeTab(req.params.id)
      .then(closedTabId => {
        res.send(`Successfully closed tab with id ${closedTabId}`)
      }).catch(err => {
        res.status(500).send(err)
      })
  },
}

module.exports = {
  tabs,
}
