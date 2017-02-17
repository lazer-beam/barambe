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
  menuLiquorAddIns: [],
  menuBeers: [{ name: 'Corona', price: 4.00 }, { name: 'Pabst Blue Ribbon', price: 3.00 }, { name: 'Budweiser', price: 5.00 }],
  menuCocktails: [],
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
