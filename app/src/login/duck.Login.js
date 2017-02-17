// ========================================
//            ACTIONS
// ========================================

export const types = {
  APP_MOUNTED: 'LOGIN/LOGIN_MOUNTED',
  LOG_IN: 'LOGIN/LOGIN_SUCCESS',
}

// ========================================
//            REDUCERS
// ========================================

const defaultProps = {
  mounted: false,
  loggedIn: false,
}

export default (state = defaultProps, action) => {
  switch (action.type) {
    case types.APP_MOUNTED:
      return { ...state, mounted: true }
    case types.LOG_IN:
      return { ...state, loggedIn: true }

    default:
      return state
  }
}

// ========================================
//           ACTION CREATORS
// ========================================

export const actions = {
  mount: () => ({ type: types.APP_MOUNTED }),
  logIn: () => ({ type: types.LOG_IN }),
}
