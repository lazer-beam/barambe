const util = require('../utilities/drinksUtil')

const drinks = {
  getAllDrinks: (req, res) => {
    console.log(`Serving request for ${req.method} where url is ${req.url}`)
    let beerArr = []
    let liquorArr = []
    let cocktailArr = []

    util.getDrinkType('beer')
    .then(beerResult => {
      beerArr = beerResult
      return util.getDrinkType('shot')
    })
    .then(shotResult => {
      liquorArr = shotResult
      return util.getDrinkType('cocktail')
    })
    .then(cocktailResult => {
      cocktailArr = cocktailResult
      console.log('beerArr: ', beerArr)
      console.log('liquorArr: ', liquorArr)
      console.log('cocktailArr: ', cocktailArr)

      const allDrinksObj = {
        beerArr,
        liquorArr,
        cocktailArr,
      }
      res.send(allDrinksObj)
    })
    // res.send({
    //   beerArr,
    //   liquorArr,
    //   cocktailArr,
    // })
  },
}

module.exports = {
  drinks,
}
