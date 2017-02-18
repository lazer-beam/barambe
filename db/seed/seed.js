const fs = require('fs')
const Promise = require('bluebird')
const path = require('path')

const createMockModels = require('./createMockModels')

const vodkas = ['Greygoose', 'Absolut Vodka', 'Ciroc', 'Svedka', 'Stolichnaya']
const rums = ['Bacardi', 'Captain Morgan', 'Havana Club', 'Cacique']
const gins = ['Bombay Sapphire', 'Beefeater Gin', 'Plymouth', 'Citadelle']
const brandys = ['Remy Martin', 'Hennessy']
const scotches = ['Johnnie Walker', 'Chivas Regal']
const bourbons = ['Old Crow', 'Eagle Rare']
const allDrinks = vodkas.concat(rums).concat(gins).concat(brandys).concat(scotches).concat(bourbons)
const prices = [650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250]

let vodkaIdx = 0
let rumIdx = 0
let ginIdx = 0
let brandyIdx = 0
let scotchIdx = 0
let bourbonIdx = 0

Promise.promisifyAll(fs)

const mapCocktail = cocktail => {
  if (cocktail.Alcohol === 'Vodka') {
    cocktail.Alcohol = vodkas[vodkaIdx]
    vodkaIdx = vodkaIdx === 4 ? 0 : vodkaIdx + 1
  } else if (cocktail.Alcohol === 'Rum') {
    cocktail.Alcohol = rums[rumIdx]
    rumIdx = rumsIdx === 3 ? 0 : rumsIdx + 1
  } else if (cocktail.Alcohol === 'Gin') {
    cocktail.Alcohol = gins[ginIdx]
    ginIdx = ginIdx === 3 ? 0 : ginIdx + 1
  } else if (cocktail.Alcohol === 'Gin') {
    cocktail.Alcohol = gins[ginIdx]
    ginIdx = ginIdx === 3 ? 0 : ginIdx + 1
  } else if (cocktail.Alcohol === 'Brandy') {
    cocktail.Alcohol = brandys[brandyIdx]
    brandyIdx = brandyIdx === 1 ? 0 : brandyIdx + 1
  } else if (cocktail.Alcohol === 'Scotch') {
    cocktail.Alcohol = scotches[scotchIdx]
    scotchIdx = scotchIdx === 1 ? 0 : scotchIdx + 1
  } else if (cocktail.Alcohol === 'Bourbon') {
    cocktail.Alcohol = bourbons[bourbonIdx]
    bourbonIdx = bourbonIdx === 1 ? 0 : bourbonIdx + 1
  }

  if (cocktail.Alcohol2 === 'Vodka') {
    cocktail.Alcohol = vodkas[vodkaIdx]
    vodkaIdx = vodkaIdx === 4 ? 0 : vodkaIdx + 1
  } else if (cocktail.Alcohol2 === 'Rum') {
    cocktail.Alcohol = rums[rumIdx]
    rumIdx = rumsIdx === 3 ? 0 : rumsIdx + 1
  } else if (cocktail.Alcohol2 === 'Gin') {
    cocktail.Alcohol = gins[ginIdx]
    ginIdx = ginIdx === 3 ? 0 : ginIdx + 1
  } else if (cocktail.Alcohol2 === 'Gin') {
    cocktail.Alcohol = gins[ginIdx]
    ginIdx = ginIdx === 3 ? 0 : ginIdx + 1
  } else if (cocktail.Alcohol2 === 'Brandy') {
    cocktail.Alcohol = brandys[brandyIdx]
    brandyIdx = brandyIdx === 1 ? 0 : brandyIdx + 1
  } else if (cocktail.Alcohol2 === 'Scotch') {
    cocktail.Alcohol = scotches[scotchIdx]
    scotchIdx = scotchIdx === 1 ? 0 : scotchIdx + 1
  } else if (cocktail.Alcohol2 === 'Bourbon') {
    cocktail.Alcohol = bourbons[bourbonIdx]
    bourbonIdx = bourbonIdx === 1 ? 0 : bourbonIdx + 1
  }

  return cocktail
}

const filterCocktails = cocktails => {
  return cocktails.filter(cocktail => {
    predefinedDrinkInCocktail = false
    allDrinks.forEach(drink => {
      if (JSON.stringify(cocktail).includes(drink)) {
        predefinedDrinkInCocktail = true
      }
    })
    return predefinedDrinkInCocktail
  })
}

const mapAddIns = cocktails => {
  return cocktails.map(cocktail => {
    let addIns = []
    addIns = addIns.concat(cocktail.AddIn.split(', ')).concat(cocktail.AddIn2.split(', '))
    delete cocktail.AddIn
    delete cocktail.AddIn2
    cocktail.addIns = addIns
    return cocktail
  })
}

const mapAlcoholsToArray = cocktails => {
  return cocktails.map(cocktail => {
    const liquors = []

    if (cocktail.Alcohol.length > 0) {
      liquors.push(cocktail.Alcohol)
    }

    if (cocktail.Alcohol2.length > 0) {
      liquors.push(cocktail.Alcohol2)
    }

    delete cocktail.Alcohol
    delete cocktail.Alcohol2
    cocktail.liquors = liquors
    return cocktail
  })
}

const addPrices = cocktails => {
  return cocktails.map(cocktail => {
    cocktail.price = prices[Math.floor(Math.random() * prices.length)]
    return cocktail
  })
}

fs.readFileAsync(path.join(__dirname, '../../cocktails.json'), 'utf8')
  .then(cocktails => {
    return JSON.parse(cocktails).filter(cocktail => {
      return !cocktail.Alcohol.includes(' ') && !cocktail.Alcohol.includes(' ') ? mapCocktail(cocktail) : false
    })
  }).then(cocktails => filterCocktails(cocktails))
  .then(cocktails => mapAddIns(cocktails))
  .then(cocktails => mapAlcoholsToArray(cocktails))
  .then(cocktails => addPrices(cocktails))
  .then(cocktails => createMockModels(cocktails))
  .catch(err => {
    console.log('err in catch', err)
  })
