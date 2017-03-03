const util = require('../utilities/drinksUtil')

const drinks = {
  addToMenu: (req, res) => {
    console.log('ctrlr body: ', req.body)
    util.addToMenu(req.body)
    .then(newItem => res.send(newItem))
    .catch(err => res.status(500).send(err))
  },

  deleteItem: (req, res) => {
    console.log('drinkCtrl delete received: ', req.body)
    util.deleteItem(req.body)
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err))
  },

  getAllDrinks: (req, res) => {
    let beerArr = []
    let liquorArr = []
    let cocktailArr = []
    let addInArr = []

    util.getDrinkType('beer')
    .then(beerResult => {
      beerArr = beerResult
      return util.getDrinkType('shot')
    })
    .then(shotResult => {
      liquorArr = shotResult
      return util.getDrinkType('cocktail')
    }).then(cocktailResult => {
      cocktailArr = cocktailResult
      return util.getAddIns()
    })
    .then(addInResult => {
      addInArr = addInResult
      console.log('beerArr: ', beerArr)
      console.log('liquorArr: ', liquorArr)
      console.log('cocktailArr: ', cocktailArr)

      const allDrinksObj = {
        beerArr,
        liquorArr,
        cocktailArr,
        addInArr,
      }
      res.send(allDrinksObj)
    })
  },
}

module.exports = {
  drinks,
}
