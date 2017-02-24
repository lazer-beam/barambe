import React from 'react'
import { Route, IndexRedirect } from 'react-router'
// import AuthService from './util/AuthService'

import App from './App'
import LoginSplash from './login/LoginSplash'
import Login from './login/Login'
import Dashboard from './dashboard/Dashboard'
import CustomAuth from './util/CustomAuth'

const auth = new CustomAuth(process.env.AUTH_CLIENT_ID, process.env.AUTH_DOMAIN)

const NotFound = () => (<h1>404.. This page is not found!</h1>)

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/home' })
  }
}

const parseAuthHash = nextState => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.parseHash(nextState.location.hash)
  }
}

export default (
  <Route path="/" component={App} auth={auth}>
    <IndexRedirect to="/dashboard" />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    <Route path="home" component={LoginSplash} />
    <Route path="login" component={Login} onEnter={parseAuthHash} />

    <Route path="*" component={NotFound} />
  </Route>
)
