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
}

module.exports = {
  tabs,
}
