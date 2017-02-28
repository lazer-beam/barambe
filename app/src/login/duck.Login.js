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
  tokenSet: ['accessToken', 'idToken'],
  profileSet: ['userProfile'],
  loadingComplete: null,
  authFailure: ['error'],
  logout: null,
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modalOpen: false,
  loginModalOpen: false,
  progressModalOpen: false,
  progressModalPercent: 1,
  fetching: false,
  loginFetching: false,
  error: null,
  userData: null,
})

/* ------------- Reducers ------------- */

const closeModalR = (state = INITIAL_STATE) => Immutable.merge(state, { modalOpen: false, progressModalOpen: true })
const openModalR = (state = INITIAL_STATE) => state.merge({ modalOpen: true })

const closeLoginModalR = (state = INITIAL_STATE) => state.merge({ loginModalOpen: false })
const openLoginModalR = (state = INITIAL_STATE) => state.merge({ loginModalOpen: true })

const signupRequestR = (state = INITIAL_STATE) => Immutable.merge(state, { fetching: true, progressModalPercent: 20 })
const loginRequestR = (state = INITIAL_STATE) => Immutable.merge(state, { fetching: true, progressModalPercent: 60 })

const signupSuccessR = (state = INITIAL_STATE) => Immutable.merge(state, { error: null, progressModalPercent: 40 })
const loginSuccessR = (state = INITIAL_STATE) => Immutable.merge(state, { error: null, progressModalPercent: 80 })

const tokenSetR = (state = INITIAL_STATE) => Immutable.merge(state, { error: null, progressModalPercent: 90 })
const profileSetR = (state = INITIAL_STATE, userData) => Immutable.merge(state, { error: null, progressModalPercent: 100, userData })
const loadingCompleteR = (state = INITIAL_STATE) => Immutable.merge(state, { fetching: false })

const failureR = (state = INITIAL_STATE, { error }) => state.merge({ fetching: false, error })

const logoutR = () => INITIAL_STATE


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLOSE_MODAL]: closeModalR,
  [Types.OPEN_MODAL]: openModalR,
  [Types.CLOSE_LOGIN_MODAL]: closeLoginModalR,
  [Types.OPEN_LOGIN_MODAL]: openLoginModalR,
  [Types.SIGNUP_REQUEST]: signupRequestR,
  [Types.LOGIN_REQUEST]: loginRequestR,
  [Types.SIGNUP_SUCCESS]: signupSuccessR,
  [Types.LOGIN_SUCCESS]: loginSuccessR,
  [Types.TOKEN_SET]: tokenSetR,
  [Types.PROFILE_SET]: profileSetR,
  [Types.LOADING_COMPLETE]: loadingCompleteR,
  [Types.AUTH_FAILURE]: failureR,
  [Types.LOGOUT]: logoutR,
})

/* ------------- Sagas ------------- */

/* ------------- Selectors ------------- */

