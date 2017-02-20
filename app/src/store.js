import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

const plugins = [
  thunk,
  logger(),
]

const middleware = applyMiddleware(...plugins)
const store = createStore(reducers, middleware)

export default store
