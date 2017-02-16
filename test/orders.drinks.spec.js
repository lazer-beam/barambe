const Promise = require('bluebird')
const request = require('supertest')
const expect = require('chai').expect

const app = require('../server/server.js')
const AddIn = require('../db/models/addInModel')
const Drink = require('../db/models/drinkModel')
const Liquor = require('../db/models/liquorModel')
const Order = require('../db/models/orderModel')
const Tab = require('../db/models/tabModel')
const drinksUtil = require('../server/utilities/drinksUtil')
const orderUtil = require('../server/utilities/ordersUtil')

describe('Drinks Helpers Functionality', () => {
  var createdLines = []
  var drinkIds = [];

  before(() => {
    //Create one beer & one shot
    return Drink.create({
      type: 'beer',
      name: 'Miller Lite',
      price: 500
    }).bind({}).then(drink => {
      createdLines.push(drink)
      drinkIds.push(drink.dataValues.id)
      return Drink.create({
        type: 'shot',
        name: 'Greygoose',
        price: 800
      })
    }).then(drink => {
      createdLines.push(drink)
      drinkIds.push(drink.dataValues.id)
      this.cocktailDrink = drink
      return Liquor.create({ name: 'Greygoose' })
    }).then(liquor => {
      createdLines.push(liquor)
      return this.cocktailDrink.addLiquor(liquor)
    })
  })

  after(() => Promise.each(createdLines, line => line.destroy()))

  it('should get all drinks associated with all orders', () => {
    let mockOrders = drinkIds.map(drinkId => {
      return { status: 'pending', drinkId: drinkId }
    })

    return drinksUtil.getAllDrinks(mockOrders).then(drinks => {
      drinks.forEach(drink => {
        expect(drink.dataValues).to.be.ok
        expect(drink.dataValues).to.have.all.keys('id', 'type', 'name', 'price')
        expect(drink.dataValues.id).to.be.a('number')
        expect(drink.dataValues.price).to.be.a('number')
      })
    })
  })
})

describe('Drinks Formatting Helper Functions', () => {
  var createdLines = []
  var drinks = []

  before(() => {
    //create one beer, one shot, one cocktail
    return Drink.create({
      type: 'beer',
      name: 'Natural Lite',
      price: 550
    }).then(drink => {
      createdLines.push(drink)
      drinks.push(drink)
      return Drink.create({
        type: 'shot',
        name: 'Absolut Vodka',
        price: 800
      })
    }).then(drink => {
      createdLines.push(drink)
      drinks.push(drink)
      this.shot = drink
      return Liquor.create({ name: 'Absolut Vodka' })
    }).then(liquor => {
      createdLines.push(liquor)
      this.absolut = liquor
      return this.shot.addLiquor(liquor)
    }).then(() => {
      return Drink.create({
        type: 'cocktail',
        name: 'Yuriy\'s Special',
        price: 1300
      })
    }).then(drink => {
      createdLines.push(drink)
      drinks.push(drink)
      this.cocktail = drink
      return drink.addLiquor(this.absolut)
    }).then(() => Liquor.create({ name: 'Smirnoff' }))
    .then(liquor => {
      createdLines.push(liquor)
      return this.cocktail.addLiquor(liquor)
    }).then(() => AddIn.create({ name: 'Salt' }))
    .then(addIn => {
      createdLines.push(addIn)
      return this.cocktail.addAddIn(addIn)
    }).then(() => AddIn.create({ name: 'Olives' }))
    .then(addIn => {
      createdLines.push(addIn)
      this.cocktail.addAddIn(addIn)
    })
  })

  after(() => Promise.each(createdLines, line => line.destroy()))

  it('should get a drinks object with the related liqours and addIns', () => {
    return orderUtil.formatDrinksWithLiquorsAndAddIns(drinks)
      .then(drinks => {
        drinks.forEach(drink => {
          if(drink.type === 'beer') {
            expect(drink.name).to.be.equal('Natural Lite')
            expect(drink.price).to.be.equal(550)
            expect(drink.liquors).to.be.an('undefined')
            expect(drink.addIns).to.be.an('undefined')
          } else if(drink.type === 'shot') {
            expect(drink.name).to.be.equal('Absolut Vodka')
            expect(drink.price).to.be.equal(800)
            expect(drink.liquors).to.be.an.instanceOf(Array)
            expect(drink.liquors).to.include('Absolut Vodka');
            expect(drink.addIns).to.be.an('undefined')
          } else if(drink.type === 'cocktail') {
            expect(drink.name).to.be.equal('Yuriy\'s Special')
            expect(drink.price).to.be.equal(1300)
            expect(drink.liquors).to.be.an.instanceOf(Array)
            expect(drink.liquors).to.include('Absolut Vodka')
            expect(drink.liquors).to.include('Smirnoff')
            expect(drink.addIns).to.be.an.instanceOf(Array)
            expect(drink.addIns).to.include('Salt')
            expect(drink.addIns).to.include('Olives')
          }
        })
      })
  })

  it('should format array of drinks in presentable format for client', () => {
    const mockDrinks = [{
      id: 117,
      type: 'beer',
      name: 'Natural Lite',
      price: 550,
    }, {
      id: 118,
      type: 'shot',
      name: 'Absolut Vodka',
      price: 800,
      liquors: [{
        name: 'AbsolutVodka ',
        'price ': null,
      }],
    },
    {
      id: 119,
      type: 'cocktail ',
      name: 'Yuriy \'s Special',
      price: 1300,
      liquors: [{
        name: 'Absolut Vodka',
      },
      {
        name: 'Smirnoff ',
      },
      ],
      addIns: [
        {
          name: 'Salt ',
        },
        {
          'name ': 'Olives ',
        },
      ],
    }]

    const mockOrders = [{ id: 1, status: 'pending', time: '2017-02-15T09:02:35.703Z', tabId: 1, drinkId: 117},
                   { id: 2, status: 'closed', time: '2017-02-15T11:02:35.703Z', tabId: 2, drinkId: 118},
                   { id: 3, status: 'pending', time: '2017-02-15T13:02:35.703Z', tabId: 2, drinkId: 119}]

    const ordersResult = orderUtil.mapDrinksWithinOrderObj(mockOrders, mockDrinks)
    expect(ordersResult).to.have.length(3)
    ordersResult.forEach(order => {
      expect(order.id).to.be.a('number')
      if(order.type === 'beer') {
        expect(order.drink.name).to.be.equal('Natural Light')
      } else if(order.type === 'shot') {
        expect(order.drink.name).to.be.equal('Absolut Vodka')
        expect(order.drink.liqours).to.have.length(1)
      } else if(order.type === 'cocktail') {
        expect(order.drink.name).to.be.equal('Yuriy\'s Special')
        expect(order.drink.liqours).to.have.length(2)
        expect(order.drink.addIns).to.have.length(2)
      }
    })
  })
})
