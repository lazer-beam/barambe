import { combineReducers } from 'redux'
import login from './login/duck.Login'
import dash from './dashboard/duck.Dashboard'
import bar from './bartender/duck.Bartender'
import drinks from './drinks/duck.Drinks'

export default combineReducers({
  login,
  dash,
  bar,
  drinks,
})
