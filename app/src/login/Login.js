import React, { Component } from 'react'
import { Modal, Form, Button, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import '../App.css'

import LoginActions from './duck.Login'

@connect(store => ({
  loginModalOpen: store.login.loginModalOpen,
}))
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  onSubmitLogin(email, password) {
    this.props.dispatch(LoginActions.loginRequest(email, password, this.props.auth))
  }

  handleClose() {
    this.props.dispatch(LoginActions.closeLoginModal())
  }

  handleInputChange(e, value, key) {
    const obj = { ...this.state }
    obj[key] = value
    this.setState(obj)
  }

  render() {
    return (
      <div>
        <Modal
          basic
          open={this.props.loginModalOpen}
          closeOnDimmerClick
          onClose={::this.handleClose}
        >
          <Modal.Header>Login</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Form.Input
                  onChange={(a, b) => this.handleInputChange(a, b.value, 'email')}
                  placeholder="email"
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  onChange={(a, b) => this.handleInputChange(a, b.value, 'password')}
                  placeholder="password"
                />
              </Form.Field>
            </Form>
            <Button
              onClick={() => this.onSubmitLogin(this.state.email, this.state.password, this.props.auth)}
              basic color="yellow"
            >Submit</Button>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default Login
