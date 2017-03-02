// ========================================
//            ACTIONS
// ========================================
export const types = {
  TOGGLE_SIDEBAR_OUT: 'DASH/TOGGLE_SIDEBAR_OUT',
  TOGGLE_SIDEBAR_IN: 'DASH/TOGGLE_SIDEBAR_IN',
  NAV_SELECT_SIDEBAR_ITEM: 'DASH/NAV_SELECT_SIDEBAR_ITEM',
  NAV_SELECT_DRINKS: 'DASH/NAV_SELECT_DRINKS',
}

// ========================================
//            REDUCERS
// ========================================
const defaultProps = {
  visible: false,
  currentNav: 'home',
}

export default (state = defaultProps, action) => {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR_OUT:
      return { ...state, visible: true }
    case types.TOGGLE_SIDEBAR_IN:
      return { ...state, visible: false }
    case types.NAV_SELECT_SIDEBAR_ITEM:
      return { ...state, currentNav: action.payload }
    case types.NAV_SELECT_DRINKS:
      return { ...state, currentNav: 'drinks' }

    default:
      return state
  }
}

// ========================================
//           ACTION CREATORS
// ========================================
export const actions = {
  toggleSidebarOut: () => ({ type: types.TOGGLE_SIDEBAR_OUT }),
  toggleSidebarIn: () => ({ type: types.TOGGLE_SIDEBAR_IN }),
  navSelection: selection => ({ type: types.NAV_SELECT_SIDEBAR_ITEM, payload: selection }),
}
