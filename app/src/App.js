import React, { Component } from 'react'

import './App.css'

class App extends Component {
  componentDidMount() {}

  render() {
    let children = null
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth,
      })
    }

    return (
      <div className="allBody">
        {children}
      </div>
    )
  }
}

export default App
