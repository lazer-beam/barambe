const chai = require('chai')
const request = require('supertest')
const app = require('../server/server')
const initDb = require('../db/config')

const expect = chai.expect
const assert = chai.assert

describe('Bartender Adding Drinks', function() {
  beforeEach(function(done) {
    initDb(true).then(function() { done()})
  })

  afterEach(function() {
    app.close()
  })

  it('Bartender should be able to add liquor', function() {
    
  })
})