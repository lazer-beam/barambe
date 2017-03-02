const tabsUtil = require('../utilities/tabsUtil')

const tabs = {
  open: (req, res) => {
    console.log('req.body is:', req.body)
    tabsUtil.openTab(req.body.customerName, req.body.tableNum)
      .then(tab => {
        console.log('new tab: ', tab.dataValues.id)
        res.send(`Created tab ${tab.dataValues.id}`)
      }).catch(err => {
        console.log('err: ', err)
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
