import { combineReducers } from 'redux'
import login from './login/duck.Login'
import dash from './dashboard/duck.Dashboard'

export default combineReducers({
  login,
  dash,
})
