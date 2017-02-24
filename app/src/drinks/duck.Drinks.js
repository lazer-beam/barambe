// ========================================
//            ACTIONS
// ========================================
export const types = {
  // GET_BEERS: 'GET_BEERS',
  // GET_COCKTAILS: 'GET_COCKTAILS',
  // GET_LIQUORS: 'GET_LIQUORS',
  GET_DRINKS: 'GET_DRINKS',
  TOGGLE_MENU: 'TOGGLE_MENU',
  POST_DRINKS: 'POST_DRINKS',
}

// ========================================
//            REDUCERS
// ========================================
const defaultProps = {
  currentAddView: 'liquorAddIns',
  menuLiquors: [{ name: 'Black Swan', price: 40.00 }, { name: 'Vodcka', price: 30.00 }, { name: 'Rum', price: 50.00 }],
  menuAddIns: [{ name: 'Olives', price: 0.00 }, { name: 'Cherries', price: 0.00 }, { name: 'Gold Flakes', price: 5.00 }],
  menuBeers: [{ name: 'Corona', price: 4.00 }, { name: 'Pabst Blue Ribbon', price: 3.00 }, { name: 'Budweiser', price: 5.00 }],
  menuCocktails: [{ name: 'Drewscriver', price: 8.00 }, { name: 'Michelada', price: 6.00 }, { name: 'Muay Thai Mai Tai', price: 10.00 }],
}

export default (state = defaultProps, action) => {
  switch (action.type) {
    case types.TOGGLE_MENU:
      return { ...state, currentAddView: action.payload }
    case types.GET_DRINKS:
      return {
        ...state,
        menuLiquors: action.payload.liquors || state.menuLiquors,
        menuAddIns: action.payload.addIns || state.menuAddIns,
        menuBeers: action.payload.beers || state.menuBeers,
        menuCocktails: action.payload.cocktails || state.menuCocktails,
      }
    case types.POST_DRINKS:
      action.payload.price = action.payload.textPrice
      if (action.payload.type === 'beer') {
        const temp = state.menuBeers.slice()
        temp.unshift(action.payload)
        console.log('temp: ', temp)
        return { ...state, menuBeers: temp }
      } else if (action.payload.type === 'cocktail') {
        const temp = state.menuCocktails.slice()
        temp.unshift(action.payload)
        console.log('temp: ', temp)
        return { ...state, menuCocktails: temp }
      } else if (action.payload.type === 'liquor') {
        const temp = state.menuLiquors.slice()
        console.log('temp: ', temp)
        temp.unshift(action.payload)
        return { ...state, menuLiquors: temp }
      } else if (action.payload.type === 'addIn') {
        const temp = state.menuAddIns.slice()
        console.log('temp: ', temp)
        temp.unshift(action.payload)
        return { ...state, menuAddIns: temp }
      }
      return state
    default:
      return state
  }
}

// ========================================
//           ACTION CREATORS
// ========================================
export const actions = {
  toggleMenu: menuName => ({ type: types.TOGGLE_MENU, payload: menuName }),
  getDrinks: drinksObj => ({ type: types.GET_DRINKS, payload: drinksObj }),
  postDrink: newDrinkObj => {
    console.log('newDrinkObj: ', JSON.stringify(newDrinkObj))
    return { type: types.POST_DRINKS, payload: newDrinkObj }
  },
  // getBeers: beerArr => ({type: types.GET_BEERS, payload: beerArr}),
  // getCocktails: cocktailArr => ({type: types.GET_COCKTAILS, payload: cocktailArr}),
  // getLiquors: liquorArr => ({type: types.GET_LIQUORS, payload: liquorArr}),
}
