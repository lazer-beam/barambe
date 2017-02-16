import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dashboard from './dashboard/Dashboard'
import LoginSplash from './login/LoginSplash'
import { actions } from './login/duck.Login'

import './App.css'

@connect(store => ({
  loggedIn: store.login.loggedIn,
}))
class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(actions.logIn())
    }, 3000)
  }

  render() {
    return (
      <div>
        { this.props.loggedIn ? <Dashboard /> : <LoginSplash /> }
      </div>
    )
  }
}

export default App
