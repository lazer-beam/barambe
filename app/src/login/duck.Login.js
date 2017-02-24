import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  closeModal: null,
  openModal: null,
  signupRequest: ['email', 'password', 'auth'],
  authFailure: ['error'],
  signupSuccess: ['userData'],

})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modalOpen: false,
  fetching: false,
  error: null,
  userData: null,
})

/* ------------- Reducers ------------- */

const closeModal = (state = INITIAL_STATE) => state.merge({ modalOpen: false })

const openModal = (state = INITIAL_STATE) => state.merge({ modalOpen: true })

const request = (state = INITIAL_STATE) => state.merge({ fetching: true })

const success = (state = INITIAL_STATE, { userData }) =>
  state.merge({ fetching: false, error: null, userData })

const failure = (state = INITIAL_STATE, { error }) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLOSE_MODAL]: closeModal,
  [Types.OPEN_MODAL]: openModal,
  [Types.SIGNUP_REQUEST]: request,
  [Types.SIGNUP_SUCCESS]: success,
  [Types.SIGNUP_FAILURE]: failure,
})

/* ------------- Sagas ------------- */

/* ------------- Selectors ------------- */

