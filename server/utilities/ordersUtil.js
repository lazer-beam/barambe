const Order = require('../../db/models/orderModel')
const Tab = require('../../db/models/tabModel')
const drinksUtil = require('./drinksUtil')
const liquorsUtil = require('./liquorsUtil')
const addInsUtil = require('./addInsUtil')

const mapOrdersToDataValues = orders => orders.map(order => order.dataValues)

const getAllOrdersWithStatusOpen = orders => orders.filter(order => order.status === 'pending')

const isTableOrPickup = tabId => Tab.findOne({ where: { id: tabId } })
  .then(tab => {
    return tab.dataValues.tableNum ? tab.dataValues.tableNum : 0
  })

const addDeliveryType = orders => {
  return Promise.all(orders.map(order => {
    return isTableOrPickup(order.tabId)
      .then(tableNum => {
        order.tableNum = tableNum ? tableNum : 0
        return order
      })
  }))
}

const formatDrinksWithLiquorsAndAddIns = drinks => {
  return Promise.all(drinks.map(drink => {
    if (drink.type === 'shot') {
      return liquorsUtil.getLiquors(drink)
        .then(liquors => {
          return Object.assign(drink.dataValues, { liquors: liquorsUtil.mapLiquors(liquors) })
        })
    } else if (drink.type === 'cocktail') {
      return liquorsUtil.getLiquors(drink)
        .then(liquors => {
          this.drinkObj = Object.assign(drink.dataValues, { liquors: liquorsUtil.mapLiquors(liquors) })
          return addInsUtil.getAddIns(drink)
        }).then(addIns => {
          return Object.assign(this.drinkObj, { addIns: addInsUtil.mapAddIns(addIns) })
        })
    }
    return drink.dataValues
  }))
}

const mapDrinksWithinOrderObj = (orders, drinks) => {
  return orders.map(order => {
    const foundDrink = drinks.find(drink => drink.id === order.drinkId)

    return {
      drink: foundDrink,
      id: order.id,
      time: order.time,
      tabId: order.tabId,
      tableNum: order.tableNum,
    }
  })
}

const getAllPendingOrders = () => {
  return Order.findAll().bind({})
    .then(orders => addDeliveryType(mapOrdersToDataValues(orders)))
    .then(orders => getAllOrdersWithStatusOpen(orders))
    .then(orders => {
      this.orders = orders
      return drinksUtil.getAllDrinks(orders)
    }).then(drinks => formatDrinksWithLiquorsAndAddIns(drinks))
    .then(drinks => mapDrinksWithinOrderObj(this.orders, drinks))
}

const closeOrder = orderId => Order.findOne({ where: { id: orderId } })
  .then(order => order.update({ status: 'closed' }))
  .then(order => order.dataValues.id)

const createOrder = (drinkName, tabId) => {
  return Order.create({})
    .then(order => {
      this.order = order
      return drinksUtil.findDrinkByName(drinkName)
    }).then(foundDrink => this.order.setDrink(foundDrink))
    .then(() => Tab.findOne({ where: { id: tabId } }))
    .then(tab => this.order.setTab(tab))
    .then(() => this.order)
}

module.exports = {
  getAllPendingOrders,
  getAllOrdersWithStatusOpen,
  addDeliveryType,
  isTableOrPickup,
  formatDrinksWithLiquorsAndAddIns,
  mapDrinksWithinOrderObj,
  closeOrder,
  createOrder,
}
