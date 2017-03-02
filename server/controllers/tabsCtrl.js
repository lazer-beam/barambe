const tabsUtil = require('../utilities/tabsUtil')

const tabs = {
  open: (req, res) => {
    tabsUtil.openTab(req.body.customerName, req.body.tableNum)
      .then(tab => {
        res.send(`Created tab ${tab.dataValues.id}`)
      }).catch(err => {
        console.log('err: ', err)
        res.status(500).send(err)
      })
  },
  close: (req, res) => {
    console.log('closing tab, with id: ', req.params.id)
    tabsUtil.closeTab(req.params.id)
      .then(closedTabId => {
        console.log(`Successfully closed tab with id ${closedTabId}`)
        res.send(`Successfully closed tab with id ${closedTabId}`)
      }).catch(err => {
        res.status(500).send(err)
      })
  },
}

module.exports = {
  tabs,
}
