import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Form, Button, Divider } from 'semantic-ui-react'
// import { browserHistory } from 'react-router'

import LoginMessages from './LoginMessages'
import LoginActions from './duck.Login'

@connect(store => ({
  modalOpen: store.login.modalOpen,
  signupError: store.login.error,
}))
class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barName: '',
      email: '',
      password: '',
    }
  }

  onSubmitSignUp() {
    this.props.dispatch(LoginActions.signupRequest(this.state.email, this.state.password, this.props.auth))
  }

  handleClose() {
    this.props.dispatch(LoginActions.closeModal())
  }

  handleInputChange(e, value, key) {
    const obj = { ...this.state }
    obj[key] = value
    this.setState(obj)
  }

  render() {
    const msg = 'emailTaken'
    return (
      <Modal
        basic
        open={this.props.modalOpen}
        onClose={::this.handleClose}
        closeOnDimmerClick
        size={'small'}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Sign up your bar today!</Header>
            <Divider />
          </Modal.Description>
          <Form>
            <Form.Field>
              <Form.Input
                label="Bar username"
                placeholder="bar-name"
                onChange={(a, b) => this.handleInputChange(a, b.value, 'barName')}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Email"
                placeholder="barambe@email.com"
                onChange={(a, b) => this.handleInputChange(a, b.value, 'email')}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Password"
                placeholder="secret"
                onChange={(a, b) => this.handleInputChange(a, b.value, 'password')}
              />
            </Form.Field>
          </Form>
          <Button basic color="yellow" onClick={() => this.onSubmitSignUp()}>
            Submit
          </Button>
          <Divider hidden />
          {(this.props.signupError) ? <LoginMessages msg={msg} /> : null}
        </Modal.Content>
      </Modal>
    )
  }
}

export default Signup
