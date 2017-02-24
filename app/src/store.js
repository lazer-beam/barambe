import { applyMiddleware, createStore, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default (rootReducer, rootSaga) => {
   /* ------------- Redux Configuration ------------- */

  const plugins = [
    logger(),
    thunk,
  ]

    /* ------------- Logger Middleware ------------- */


    /* ------------- Assemble Middleware ------------- */


  const middleware = applyMiddleware(...plugins)

  /* ------------- AutoRehydrate Enhancer ------------- */


  const store = createStore(rootReducer, middleware)

  return store
}

// const plugins = [
//   logger(),
//   thunk,
// ]

// const middleware = applyMiddleware(...plugins)
// const store = createStore(reducers, middleware)

// export default store
