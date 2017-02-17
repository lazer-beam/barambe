import 'semantic-ui-css/semantic.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import { Router, Route, Link } from 'react-router'

import App from './App'
import store from './store'
import './index.css'

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
)
