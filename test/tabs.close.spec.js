const expect = require('chai').expect

const app = require('../server/server.js')
const request = require('supertest')(app)
const tabsUtil = require('../server/utilities/tabsUtil')
const Tab = require('../db/models/tabModel')

describe('Closing A Tab: ', () => {
  afterEach(() => {
    return Tab.findAll()
      .then(tabs => {
        tabs.forEach(tab => {
          tab.destroy()
        })
      })
  })

  it('should close a tab with pickup delivery type', () => {
    return Tab.create({ customerNum: 452 })
      .then(tab => {
        expect(tab.dataValues.isOpen).to.be.true
        this.createdTabId = tab.dataValues.id
        return tabsUtil.closeTab(tab.dataValues.id)
      }).then(() => Tab.findOne({ where: { id: this.createdTabId } }))
      .then(tab => {
        expect(tab.dataValues.isOpen).to.be.false
        return tab.destroy()
      })
  })

  it('should close a tab when doing a PUT to /tabs/closetab/:id', () => {
    return Tab.create({ customerNum: 452 })
      .then(tab => {
        expect(tab.dataValues.isOpen).to.be.true
        return request
          .put('/tabs/closetab/' + tab.dataValues.id)
          .expect(200)
          .expect(res => {
            expect(res.text).to.be.equal(`Successfully closed tab with id ${tab.dataValues.id}`)
            return Tab.findOne( {where: { id: tab.dataValues.id } })
              .then(foundTab => {
                expect(foundTab.dataValues.isOpen).to.be.false
              })
          })
      })
  })
})