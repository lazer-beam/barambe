import React, { Component } from 'react'
import { Menu, Button, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

import LoginActions from './duck.Login'
import Signup from './Signup'
import '../App.css'

@connect(store => ({
  modalOpen: store.login.modalOpen,
}))
class LoginSplash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: 'splash',
      modalIsOpen: false,
    }
  }

  toggIt() {
    console.log(LoginActions.toggleModal())
    this.props.dispatch(LoginActions.toggleModal(true))
  }

  render() {
    const { auth } = this.props
    return (
      <div>
        <Menu size="massive" pointing secondary>
          <Menu.Menu position="right">
            <div className="splashButton">
              <Button color="teal" size="large" onClick={() => this.toggIt()}>Sign up</Button>
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
