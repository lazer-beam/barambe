const expect = require('chai').expect

const app = require('../server/server.js')
const request = require('supertest')(app)
const tabsUtil = require('../server/utilities/tabsUtil')
const Tab = require('../db/models/tabModel')

describe('Opening A Tab Functionality', () => {
  afterEach(() => {
    return Tab.findAll()
      .then(tabs => {
        tabs.forEach(tab => {
          tab.destroy()
        })
      })
  })

  it('should open a tab with pickup delivery type', () => {
    const mockCustomerNum = 17

    return tabsUtil.openTab(mockCustomerNum)
      .then(tab => {
        expect(tab).to.be.ok
        return Tab.findAll()
      }).then(tabs => {
        expect(tabs).to.have.length(1)
        tabs.forEach(tab => {
          expect(tab.dataValues.customerNum).to.be.equal(mockCustomerNum)
          expect(tab.dataValues.tableNum).to.be.a('null')
        })
      })
  })

  it('should open a tab with table delivery type', () => {
    const mockCustomerNum = 14
    const mockTableNum = 3

    return tabsUtil.openTab(mockCustomerNum, mockTableNum)
      .then(tab => {
        expect(tab).to.be.ok
        return Tab.findAll()
      }).then(tabs => {
        expect(tabs).to.have.length(1)
        tabs.forEach(tab => {
          expect(tab.dataValues.customerNum).to.be.equal(mockCustomerNum)
          expect(tab.dataValues.tableNum).to.be.ok
          expect(tab.dataValues.tableNum).to.be.equal(mockTableNum)
        })
      })
  })

  it('should open a tab when POSTing /tabs/opentab', () => {
    const mockUser = {
      customerNum: 14,
      tableNum: 17
    }

    return request
      .post('/tabs/opentab')
      .send(mockUser)
      .expect(200)
      .expect(res => {
        expect(res.text).to.contain('Created tab')
        return Tab.findAll()
          .then(tabs => {
            expect(tabs).to.have.length(1)
            tabs.forEach(tab => {
              expect(res.text).to.be.equal(`Created tab ${tab.dataValues.id}`)
              expect(tab.dataValues.customerNum).to.be.equal(mockUser.customerNum)
              expect(tab.dataValues.tableNum).to.be.ok
              expect(tab.dataValues.tableNum).to.be.equal(mockUser.tableNum)
            })
          })
      })
  })
})