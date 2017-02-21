import React, { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: 'Login Success!',
    }
  }

  render() {
    return (
      <div>
        {this.state.temp}
      </div>
    )
  }
}

export default Login
