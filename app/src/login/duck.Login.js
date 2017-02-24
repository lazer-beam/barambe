import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  toggleModal: ['boolToggle'],
  closeModal: null,
  openModal: null,
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modalOpen: false,
})

/* ------------- Reducers ------------- */

const toggleModalReducer = (state = INITIAL_STATE, { boolToggle }: Object) => state.merge({ modalOpen: boolToggle })

const closeModal = (state = INITIAL_STATE) => state.merge({ modalOpen: false })

const openModal = (state = INITIAL_STATE) => state.merge({ modalOpen: true })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_MODAL]: toggleModalReducer,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.OPEN_MODAL]: openModal,
})

/* ------------- Selectors ------------- */
