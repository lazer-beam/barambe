import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  toggleModal: ['boolToggle'],
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modalOpen: false,
})

/* ------------- Reducers ------------- */

export const toggleModalReducer = (state = INITIAL_STATE) =>
  state.merge({ modalOpen: true })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_MODAL]: toggleModalReducer,
})

/* ------------- Selectors ------------- */


// const types = createTypes(
//   APP_MOUNTED: 'LOGIN/LOGIN_MOUNTED',
//   LOG_IN: 'LOGIN/LOGIN_SUCCESS',
//   TOGGLE_MODAL: 'LOGIN/TOGGLE_MODAL',
// )
// ========================================
//            REDUCERS
// ========================================
// const defaultProps = {
//   mounted: false,
//   loggedIn: false,
//   modalIsOpen: false,
// }

// export default (state = defaultProps, action) => {
//   switch (action.type) {
//     case types.APP_MOUNTED:
//       return { ...state, mounted: true }
//     case types.LOG_IN:
//       return { ...state, loggedIn: true }

//     default:
//       return state
//   }
// }

// // ========================================
// //           ACTION CREATORS
// // ========================================

// export const actions = {
//   mount: () => ({ type: types.APP_MOUNTED }),
//   logIn: () => ({ type: types.LOG_IN }),
// }
