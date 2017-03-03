import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

@connect(store => ({
  visible: store.dash.visible,
  currentNav: store.dash.currentNav,
}))
class App extends Component {
  componentDidMount() {
    this.a = 'apple'
  }

  render() {
    const auth = this.props.route.auth
    const child = this.props.children
    const children = child ? React.cloneElement(child, { auth }) : null
    return (
      <div className="allBody">
        {children}
      </div>
    )
  }
}

export default App
