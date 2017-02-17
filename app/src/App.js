import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dashboard from './dashboard/Dashboard'
// import LoginSplash from './login/LoginSplash'
// import { actions } from './login/duck.Login'

import './App.css'

@connect(store => ({
  loggedIn: store.login.loggedIn,
}))
class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="allBody">
        <Dashboard />
      </div>
    )
  }
}

export default App
