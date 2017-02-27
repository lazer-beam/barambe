import React, { Component } from 'react'
import { Menu, Button, Image, Modal, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import LoginActions from './duck.Login'
import Signup from './Signup'
import Login from './Login'
import ProgressModal from './ProgressModal'
import '../App.css'

@connect(store => ({
  modalOpen: store.login.modalOpen,
  loginModalOpen: store.login.loginModalOpen,
  fetching: store.login.fetching,
}))
class Home extends Component {

  static routeToLogin() {
    browserHistory.push('/login')
  }

  constructor(props) {
    super(props)
    this.state = { temp: 'splash' }
  }

  toggIt() {
    this.props.dispatch(LoginActions.openModal())
  }

  toggleLogin() {
    this.props.dispatch(LoginActions.openLoginModal())
  }

  render() {
    const { auth } = this.props
    const loading = (
      <ProgressModal />
    )

    const page = (
      <div>
        <Menu size="huge" pointing secondary>
          <Menu.Menu position="right">
            <div className="splashButton">
              <Button color="teal" size="large" onClick={() => this.toggIt()}>Sign up</Button>
              <Button color="teal" size="large" onClick={() => this.toggleLogin()}>Login</Button>
            </div>
          </Menu.Menu>
        </Menu>
        <Login auth={auth} />
        <Signup auth={auth} />
        <Image src="http://i.imgur.com/mvywlbT.png" centered size="large" />
      </div>
    )

    return (
      <div>
        {this.props.fetching ? loading : page}
      </div>
    )
  }
}

export default Home
