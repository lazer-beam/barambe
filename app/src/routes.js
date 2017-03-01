import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import AuthService from './util/AuthService'

import App from './App'
import Home from './login/LoginHome'
import Dashboard from './dashboard/Dashboard'
// import CustomAuth from './util/CustomAuth'

const auth = new AuthService(process.env.AUTH_CLIENT_ID, process.env.AUTH_DOMAIN)

const NotFound = () => (<h1>404.. This page is not found!</h1>)

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/home' })
  }
}

export default (
  <Route path="/" component={App} auth={auth}>
    <IndexRedirect to="/dashboard" />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    <Route path="home" component={Home} />
    <Route path="*" component={NotFound} />
  </Route>
)
