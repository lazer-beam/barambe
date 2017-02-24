import React, { Component } from 'react'
import { Menu, Button, Image, Modal, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import LoginActions from './duck.Login'
import Signup from './Signup'
import '../App.css'

@connect(store => ({
  modalOpen: store.login.modalOpen,
  fetching: store.login.fetching,
}))
class LoginSplash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: 'splash',
    }
  }

  toggIt() {
    this.props.dispatch(LoginActions.openModal(true))
  }

  static routeToLogin() {
    browserHistory.push('/login')
  }

  render() {
    const { auth } = this.props
    const loading = (
      <Modal open basic size="massive" >
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Modal>
    )

    const page = (
      <div>
        <Menu size="huge" pointing secondary>
          <Menu.Menu position="right">
            <div className="splashButton">
              <Button color="teal" size="large" onClick={() => this.toggIt()}>Sign up</Button>
              <Button color="teal" size="large" onClick={() => LoginSplash.routeToLogin()}>Login</Button>
            </div>
          </Menu.Menu>
        </Menu>
        <Signup auth={auth} />
        <Image src="http://i.imgur.com/aV3IGJ1.png?2" centered size="medium" />
      </div>
    )

    return (
      <div>
        {this.props.fetching ? loading : page}
      </div>
    )
  }
}

export default LoginSplash
