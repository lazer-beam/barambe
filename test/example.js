const chai = require('chai')
const app = require('../server/server')
const barsHelper = require('../server/utilities/barUtil')

const expect = chai.expect
const assert = chai.assert

const request = require('supertest')

xdescribe('Bar App Server API', function () {

  afterEach(function () {
    app.close()
  })

  it('Should get a valid bar when hitting /bar/getbar/:name', function () {
    return request(app)
      .get('/bar/getbar/yuriysbar')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert(res.body.orders.length, 2)
      })
      // .expect(res => {
      //   res.body.orders.length = 2
      // })
      // .end(done) //use done to tell mocha that async test is done
  })

  xit('Should get a valid bar when passing in a valid bar name', function (done) {
    let barName = 'andrewsbar'
    let bar = barsHelper.getBar(barName)
    expect(bar).to.be.ok
    expect(bar).to.be.an('object')
    expect(bar.name).to.equal('andrewsbar')
    expect(bar.orders.length).to.equal(0)
    done()
  })

  it('Should return undefined when passing in an invalid bar name', function () {
    let barName = 'invalidname'
    let bar = barsHelper.getBar(barName)
    expect(bar).to.be.not.ok
    expect(bar).to.be.an('undefined')
  })
})
