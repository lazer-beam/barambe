const util = require('../utilities/drinkUtil')

const drinks = {
  getInitdrinks: (req, res) => {
    const temporary = util.getAllDrinks()
    res.status(200).send(temporary)
  },
}

module.exports = {
  drinks,
}
