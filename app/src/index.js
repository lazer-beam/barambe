import 'semantic-ui-css/semantic.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import './index.css'

import createStore from './reducers'
import routes from './routes'

const store = createStore()
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root'),
)
