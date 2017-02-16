const expect = require('chai').expect
const app = require('../server/server.js')
const cusHelper = require('../server/utilities/cusUtil')
const stripe = require('stripe')(process.env.testKey);

var port = 1337
var url = 'http://127.0.0.1:' + port
const request = require('supertest')

describe('Customer Server API', function () {
  var testReqBody = {}
  before(function(done){
    testReqBody.authID = 'testauthID'
    stripe.tokens.create({//this is async
      card: {
        "number": '4242424242424242',
        "exp_month": 12,
        "exp_year": 2018,
        "cvc": '123'
      }
    }, (err, token) => {
      if(err) console.log('Token creation error: ', err)
      testReqBody.token = token;
      done()
    })
  })

  it('Should create a new user in db when posting authID and token to /customer/newuser', function () {
    return request(app)
    .post('/customer/newuser')
    .send(testReqBody)
    .expect(200)
    .expect(res => {
      expect(res.body.result).to.equal('User created')
    }).end(function() {
      let cusID = cusHelper.getCusID('testauthID')
      .then(function(cusID){
        expect(cusID).to.be.ok
      })
    })
  })

  it('Should create a charge when posting authID to /customer/pay', function () {
    let payObj = {}
    payObj.authID = authID
    payObj.amount = 1000
    payObj.currency = 'usd'
    request(app)
    .post('/customer/pay')
    .send(payObj)
    .expect(200)
    .expect(res => {
      expect(res.body.object).to.equal('charge')
    })
  })
})