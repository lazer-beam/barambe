import { combineReducers } from 'redux'

import configureStore from './store'
import { reducer } from './login/duck.Login'
import dash from './dashboard/duck.Dashboard'
import bar from './bartender/duck.Bartender'
import drinks from './drinks/duck.Drinks'

import rootSaga from './sagas'

export default () => {
  const rootReducer = combineReducers({
    login: reducer,
    dash,
    bar,
    drinks,
  })
  return configureStore(rootReducer, rootSaga)
}
