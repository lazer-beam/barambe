// ========================================
//            ACTIONS
// ========================================
export const types = {
  GET_DRINKS: 'GET_DRINKS',
  TOGGLE_MENU: 'TOGGLE_MENU',
  POST_DRINKS: 'POST_DRINKS',
  DEL_DRINKS: 'DEL_DRINKS',
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
  console.log('action in reducer: ', JSON.stringify(action))
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
    case types.POST_DRINKS:
      action.payload.price = action.payload.textPrice
      if (action.payload.type === 'beer') {
        const temp = state.menuBeers.slice()
        temp.unshift(action.payload)
        return { ...state, menuBeers: temp }
      } else if (action.payload.type === 'cocktail') {
        const temp = state.menuCocktails.slice()
        temp.unshift(action.payload)
        return { ...state, menuCocktails: temp }
      } else if (action.payload.type === 'liquor') {
        const temp = state.menuLiquors.slice()
        temp.unshift(action.payload)
        return { ...state, menuLiquors: temp }
      } else if (action.payload.type === 'addIn') {
        const temp = state.menuAddIns.slice()
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
  postDrink: newDrinkObj => ({ type: types.POST_DRINKS, payload: newDrinkObj }),
  deleteDrink: drinkObj => ({ type: types.DEL_DRINKS, payload: drinkObj }),
}
