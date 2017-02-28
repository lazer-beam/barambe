// ========================================
//            ACTIONS
// ========================================
export const types = {
  GET_DRINKS: 'GET_DRINKS',
  TOGGLE_MENU: 'TOGGLE_MENU',
  POST_DRINKS: 'POST_DRINKS',
  DEL_DRINKS: 'DEL_DRINKS',
  POST_BEER: 'POST_BEER',
  POST_COCKTAIL: 'POST_COCKTAIL',
  POST_LIQUOR: 'POST_LIQUOR',
  POST_ADDIN: 'POST_ADDIN',
}

// ========================================
//            REDUCERS
// ========================================
const defaultProps = {
  currentAddView: 'liquorAddIns',
  menuLiquors: [{ name: 'Add your menu items', price: 0 }],
  menuAddIns: [{ name: 'Add your menu items', price: 0 }],
  menuBeers: [{ name: 'Add your menu items', price: 0 }],
  menuCocktails: [{ name: 'Add your menu items', price: 0 }],
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
    case types.DEL_DRINKS:
      if (action.payload.type === 'shot') {
        return { ...state,
          menuLiquors: state.menuLiquors.filter(item => item.name !== action.payload.name),
        }
      } else if (action.payload.type === 'beer') {
        return { ...state,
          menuBeers: state.menuBeers.filter(item => item.name !== action.payload.name),
        }
      } else if (action.payload.type === 'cocktail') {
        return { ...state,
          menuCocktails: state.menuCocktails.filter(item => item.name !== action.payload.name),
        }
      }
      return { ...state,
        menuAddIns: state.menuAddIns.filter(item => item.name !== action.payload.name),
      }
    case (types.POST_BEER): {
      const temp = state.menuBeers.slice()
      temp.unshift(action.payload)
      return { ...state, menuBeers: temp }
    }
    case (types.POST_COCKTAIL): {
      const temp = state.menuCocktails.slice()
      temp.unshift(action.payload)
      return { ...state, menuCocktails: temp }
    }
    case (types.POST_LIQUOR): {
      const temp = state.menuLiquors.slice()
      temp.unshift(action.payload)
      return { ...state, menuLiquors: temp }
    }
    case (types.POST_ADDIN): {
      const temp = state.menuAddIns.slice()
      temp.unshift(action.payload)
      return { ...state, menuAddIns: temp }
    }
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
  deleteDrink: drinkObj => ({ type: types.DEL_DRINKS, payload: drinkObj }),
  postDrink: newDrinkObj => {
    newDrinkObj.price = newDrinkObj.textPrice
    let actionType = ''
    if (newDrinkObj.type === 'beer') {
      actionType = 'POST_BEER'
    } else if (newDrinkObj.type === 'cocktail') {
      actionType = 'POST_COCKTAIL'
    } else if (newDrinkObj.type === 'liquor') {
      actionType = 'POST_LIQUOR'
    } else if (newDrinkObj.type === 'addIn') {
      actionType = 'POST_ADDIN'
    }
    return { type: types[actionType], payload: newDrinkObj }
  },
}
