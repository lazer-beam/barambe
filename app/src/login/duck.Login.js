import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  closeModal: null,
  openModal: null,
  closeLoginModal: null,
  openLoginModal: null,
  signupRequest: ['email', 'password', 'auth'],
  loginRequest: ['email', 'password', 'auth'],
  signupSuccess: ['userData'],
  loginSuccess: ['userData'],
  authFailure: ['error'],
  logout: null,
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modalOpen: false,
  loginModalOpen: false,
  fetching: false,
  loginFetching: false,
  error: null,
  userData: null,
})

/* ------------- Reducers ------------- */

const closeModal = (state = INITIAL_STATE) => state.merge({ modalOpen: false })
const openModal = (state = INITIAL_STATE) => state.merge({ modalOpen: true })

const closeLoginModal = (state = INITIAL_STATE) => state.merge({ loginModalOpen: false })
const openLoginModal = (state = INITIAL_STATE) => state.merge({ loginModalOpen: true })

const request = (state = INITIAL_STATE) => state.merge({ fetching: true })
const loginRequest = (state = INITIAL_STATE) => state.merge({ loginFetching: true })

const signupSuccess = (state = INITIAL_STATE, { userData }) => state.merge({ fetching: false, error: null, userData })
const loginSuccess = (state = INITIAL_STATE) => state.merge({ fetching: false, error: null })

const failure = (state = INITIAL_STATE, { error }) => state.merge({ fetching: false, error })

const logout = () => INITIAL_STATE


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLOSE_MODAL]: closeModal,
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_LOGIN_MODAL]: closeLoginModal,
  [Types.OPEN_LOGIN_MODAL]: openLoginModal,
  [Types.SIGNUP_REQUEST]: request,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.AUTH_FAILURE]: failure,
  [Types.LOGOUT]: logout,
})

/* ------------- Sagas ------------- */

/* ------------- Selectors ------------- */

