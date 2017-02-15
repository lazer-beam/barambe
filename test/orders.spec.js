const Promise = require('bluebird')

const expect = require('chai').expect
const app = require('../server/server.js')
const barsHelper = require('../server/utilities/barUtil')

const AddIn = require('../db/models/addInModel')
const Drink = require('../db/models/drinkModel')
const Liquor = require('../db/models/liquorModel')
const Order = require('../db/models/orderModel')

var port = 1337
var url = 'http://127.0.0.1:' + port
const request = require('supertest')(url)

describe('Orders Server Functionality', () => {
  var createdLines = []

  beforeEach(() => {
    return Drink.create({
      type: 'beer',
      name: 'Miller Lite',
      price: 700
    }).then(drink => {
      createdLines.push(drink)
      return Drink.create({
        type: 'shot',
        name: 'Greygoose',
        price: 800
      })
    }).then(drink => {
      createdLines.push(drink)
      return Liquor.create({
        name: 'Greygoose'
      }).then(liquor => {
        createdLines.push(liquor)
        return drink.addLiquor(liquor)
      })
    })
  })

  afterEach(() => {
    return Promise.reduce(createdLines, function(_, line) {
      console.log('line', line.dataValues)
      line.destroy()
    }, null);
  })

  xit('Should get all the orders when hitting the endpoint /orders/getallpending', () => {
    setTimeout(() => {
      request
        .get('/orders/getallpending')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          // expect(res.body.orders.length).to.equal(2)
        })
        .end(done) //use done to tell mocha that async test is done
    }, 0)
  })

  it('Should add an addIn to the addIn table', done => {
    // let barName = 'andrewsbar'
    // let bar = barsHelper.getBar(barName)
    // expect(bar).to.be.ok
    // expect(bar).to.be.an('object')
    // expect(bar.name).to.equal('andrewsbar')
    // expect(bar.orders.length).to.equal(0)
    done()
  })

  xit('Should get all addIns from a drink', done => {
    let barName = 'andrewsbar'
    let bar = barsHelper.getBar(barName)
    expect(bar).to.be.ok
    expect(bar).to.be.an('object')
    expect(bar.name).to.equal('andrewsbar')
    expect(bar.orders.length).to.equal(0)
    done()
  })

  xit('Should add a liquor to the liquor table', done => {
    let barName = 'andrewsbar'
    let bar = barsHelper.getBar(barName)
    expect(bar).to.be.ok
    expect(bar).to.be.an('object')
    expect(bar.name).to.equal('andrewsbar')
    expect(bar.orders.length).to.equal(0)
    done()
  })

  xit('Should get all liquors from a drink', done => {
    let barName = 'andrewsbar'
    let bar = barsHelper.getBar(barName)
    expect(bar).to.be.ok
    expect(bar).to.be.an('object')
    expect(bar.name).to.equal('andrewsbar')
    expect(bar.orders.length).to.equal(0)
    done()
  })
})