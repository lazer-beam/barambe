const Tab = require('../../db/models/tabModel')

const openTab = (customerNum, tableNum = null) => {
  return tableNum ? Tab.create({ customerNum, tableNum }) : Tab.create({ customerNum })
}

const closeTab = tabId => Tab.findOne({ where: { id: tabId } })
  .then(tab => tab.update({ isOpen: false }))
    .then(tab => tab.dataValues.id)

module.exports = {
  openTab,
  closeTab,
}
