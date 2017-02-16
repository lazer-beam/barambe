import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducers from './reducers'

const plugins = [
  logger(),
]

const middleware = applyMiddleware(...plugins)
const store = createStore(reducers, middleware)

export default store
