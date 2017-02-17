const Tab = require('../../db/models/tabModel')

const openTab = (customerNum, tableNum = null) => {
  return tableNum ? Tab.create({ customerNum, tableNum }) : Tab.create({ customerNum })
}

module.exports = {
  openTab,
}
