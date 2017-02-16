const Promise = require('bluebird')
const expect = require('chai').expect

const Drink = require('../db/models/drinkModel')
const Liquor = require('../db/models/liquorModel')
const liquorsUtil = require('../server/utilities/liquorsUtil')

describe('Drinks Helpers Functionality', () => {
  var createdLines = []
  var cocktail;

  before(() => {
    //create one shot
    return Drink.create({
      type: 'shot',
      name: 'Captain Morgan',
      price: 450
    }).then(drink => {
      createdLines.push(drink)
      cocktail = drink
      return Liquor.create({ name: 'Captain Morgan' })
    }).then(liquor => {
      createdLines.push(liquor)
      return cocktail.addLiquor(liquor)
    })
  })

  after(() => {
    return Promise.each(createdLines, line => {
      return line.destroy()
    })
  })

  it('gets a liquor row given it\'s associated drink', () => {
    return liquorsUtil.getLiquors(cocktail)
      .then(liquor => {
        expect(liquor).to.be.an.instanceof(Array)
        expect(liquor[0].dataValues).to.be.ok
        expect(liquor[0].dataValues.name).to.be.equal('Captain Morgan')
      })
  })
})