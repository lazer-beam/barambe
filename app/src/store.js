import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default (rootReducer, rootSaga) => {
   /* ------------- Redux Configuration ------------- */
  const sagaMiddleware = createSagaMiddleware()
  const plugins = [
    logger(),
    sagaMiddleware,
    thunk,
  ]

    /* ------------- Logger Middleware ------------- */


    /* ------------- Assemble Middleware ------------- */


  const middleware = applyMiddleware(...plugins)

  /* ------------- AutoRehydrate Enhancer ------------- */


  const store = createStore(rootReducer, middleware)
  sagaMiddleware.run(rootSaga)

  return store
}

// const plugins = [
//   logger(),
//   thunk,
// ]

// const middleware = applyMiddleware(...plugins)
// const store = createStore(reducers, middleware)

// export default store
