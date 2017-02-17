// ========================================
//            ACTIONS
// ========================================
export const types = {
  TOGGLE_BEER_ADDER: 'TOGGLE_BEER_ADDER',
  TOGGLE_LIQUORADDIN_ADDER: 'TOGGLE_LIQUORADDIN_ADDER',
  TOGGLE_COCKTAIL_ADDER: 'TOGGLE_COCKTAIL_ADDER',
  TOGGLE_MENU: 'TOGGLE_MENU',
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

    default:
      return state
  }
}

// ========================================
//           ACTION CREATORS
// ========================================
export const actions = {
  toggleMenu: menuName => ({ type: types.TOGGLE_MENU, payload: menuName }),
}
