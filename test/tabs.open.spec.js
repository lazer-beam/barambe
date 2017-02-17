const expect = require('chai').expect

const tabsUtil = require('../server/utilities/tabsUtil')
const Tab = require('../db/models/tabModel')

describe('Opening A Tab Functionality', () => {
  it('should open a tab', () => {
    return tabsUtil.openTab()
      .then(tab => {
        expect(tab).to.be.ok
        return Tab.findAll()
      }).then(tabs => {
        expect(tabs).to.have.length(0)
      })
  })
})