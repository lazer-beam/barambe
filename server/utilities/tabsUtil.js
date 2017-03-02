const Tab = require('../../db/models/tabModel')

const openTab = (customerName, tableNum) => {
  console.log(`customername: ${customerName}, tableNum: ${tableNum}`)
  return tableNum ? Tab.create({ customerName, tableNum }) : Tab.create({ customerName })
}

const closeTab = tabId => Tab.findOne({ where: { id: tabId } })
  .then(tab => tab.update({ isOpen: false }))
    .then(tab => tab.dataValues.id)

module.exports = {
  openTab,
  closeTab,
}
