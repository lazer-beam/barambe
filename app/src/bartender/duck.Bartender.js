// ========================================
//            ACTIONS
// ========================================
export const types = {
  TOGGLE_SIDEBAR_OUT: 'DASH/TOGGLE_SIDEBAR_OUT',
  TOGGLE_SIDEBAR_IN: 'DASH/TOGGLE_SIDEBAR_IN',
}

// ========================================
//            REDUCERS
// ========================================
const defaultProps = {
  visible: false,
  currentNav: 'root',
}

export default (state = defaultProps, action) => {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR_OUT:
      return { ...state, visible: true }
    case types.TOGGLE_SIDEBAR_IN:
      return { ...state, visible: false }

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
}
