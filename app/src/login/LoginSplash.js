import React, { Component } from 'react'
import { Menu, Button, Image } from 'semantic-ui-react'
import Signup from './Signup'
import '../App.css'

class LoginSplash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: 'splash',
    }
  }

  render() {
    const { auth } = this.props
    return (
      <div>
        <Menu size="massive" pointing secondary>
          <Menu.Menu position="right">
            <div className="splashButton">
              <Button color="teal" size="large">Sign up</Button>
              <Button color="teal" size="large" onClick={auth.login.bind(this)}>Login</Button>
            </div>
          </Menu.Menu>
        </Menu>
        <Signup auth={auth} />
        <Image src="http://i.imgur.com/aV3IGJ1.png?2" centered size="medium" />
      </div>
    )
  }
}

export default LoginSplash
