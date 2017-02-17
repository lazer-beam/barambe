const util = require('../utilities/drinksUtil')

const drinks = {
  getInitdrinks: (req, res) => {
    const beerArr = util.getDrinkType('beer')
    const liquorArr = util.getDrinkType('shot')
    const cocktailArr = util.getDrinkType('cocktail')
    res.send({
      beerArr,
      liquorArr,
      cocktailArr,
    })
  },
}

module.exports = {
  drinks,
}
