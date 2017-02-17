import testDrinks from '../util/testOrders'
// ========================================
//            ACTIONS
// ========================================
export const types = {
  REMOVE_ORDER: 'BAR/REMOVE_ORDER',
}

// ========================================
//            REDUCERS
// ========================================
const defaultProps = {
  unfufilledOrders: testDrinks(),
}

export default (state = defaultProps, action) => {
  switch (action.type) {
    case types.REMOVE_ORDER:
      return { ...state, unfufilledOrders: action.payload }

    default:
      return state
  }
}

// ========================================
//           ACTION CREATORS
// ========================================
export const actions = {
  removeOrder: orders => ({ type: types.REMOVE_ORDER, payload: orders }),
}
