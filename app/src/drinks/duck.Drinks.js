// ========================================
//            ACTIONS
// ========================================
export const types = {
  TOGGLE_BEER_ADDER: 'TOGGLE_BEER_ADDER',
  TOGGLE_LIQUORADDIN_ADDER: 'TOGGLE_LIQUORADDIN_ADDER',
  TOGGLE_COCKTAIL_ADDER: 'TOGGLE_COCKTAIL_ADDER',
}

// ========================================
//            REDUCERS
// ========================================
const defaultProps = {
  currentAddView: null,
  menuLiquorAddIns: [],
  menuBeers: [],
  menuCocktails: [],
}

export default (state = defaultProps, action) => {
  switch (action.type) {
    case types.TOGGLE_BEER_ADDER:
      return { ...state, currentAddView: 'beers' }
    case types.TOGGLE_LIQUORADDIN_ADDER:
      return { ...state, currentAddView: 'liquorAddIns' }
    case types.TOGGLE_COCKTAIL_ADDER:
      return { ...state, currentAddView: 'cocktails' }

    default:
      return state
  }
}

// ========================================
//           ACTION CREATORS
// ========================================
export const actions = {
  toggleBeerAdder: () => ({ type: types.TOGGLE_BEER_ADDER }),
  toggleLiquorAddinAdder: () => ({ type: types.TOGGLE_LIQUORADDIN_ADDER }),
  toggleCocktailAdder: () => ({ type: types.TOGGLE_COCKTAIL_ADDER }),
}
