const expect = require('chai').expect
const app = require('../server/server.js')
const barsHelper = require('../server/utilities/barUtil')

var port = 1337
var url = 'http://127.0.0.1:' + port
let request = require('supertest')
request = request(url);

describe('Bar App Server', function () {
  it('Should get a valid bar when hitting /bar/getbar/:name', function (done) {
    request
      .get('/bar/getbar/yuriysbar')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body.orders.length).to.equal(2)
      })
      .end(done)
  })

  it('Should get a valid bar when passing in a valid bar name', function (done) {
    let barName = 'andrewsbar'
    let bar = barsHelper.getBar(barName)
    expect(bar).to.be.ok
    expect(bar).to.be.an('object')
    expect(bar.name).to.equal('andrewsbar')
    expect(bar.orders.length).to.equal(0)
    done()
  })
})