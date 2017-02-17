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
  menuBeers: [],
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
