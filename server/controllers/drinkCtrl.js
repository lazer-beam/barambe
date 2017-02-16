const util = require('../utilities/drinksUtil')

const drinks = {
  getInitdrinks: (req, res) => {
    const temporary = util.getAllDrinks()
    res.status(200).send(temporary)
  },
}

module.exports = {
  drinks,
}
