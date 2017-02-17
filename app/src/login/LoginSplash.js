import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import '../App.css'

class LoginSplash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loc: 'splash',
    }
  }
  render() {
    return (
      <div>
        <Menu size="massive" pointing secondary>
          <Menu.Menu position="right">
            <div className="splashButton">
              <Button color="teal" size="large">Sign up</Button>
              <Button color="teal" size="large">Login</Button>
            </div>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default LoginSplash
