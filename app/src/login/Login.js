import React, { Component } from 'react'
import { Modal, Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import '../App.css'

@connect(store => ({
  fetching: store.login.fetching,
}))
class Login extends Component {

  static returnToSplash() {
    browserHistory.push('/home')
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  onSubmitLogin(email, password) {
    this.props.dispatch(LoginActions.signupRequest(email, password, this.props.auth))
  }

  handleInputChange(e, value, key) {
    const obj = { ...this.state }
    obj[key] = value
    this.setState(obj)
  }


  render() {
    return (
      <div>
        <Modal basic open closeOnDimmerClick onClose={() => Login.returnToSplash()}>
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
              <Button
                onClick={() => this.onSubmitLogin(this.state.email, this.state.password, this.props.auth)}
                basic color="yellow"
              >Submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default Login
