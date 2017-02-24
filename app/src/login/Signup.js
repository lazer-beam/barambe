import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Header, Form, Button, Divider } from 'semantic-ui-react'
// import { browserHistory } from 'react-router'

import LoginActions from './duck.Login'

@connect(store => ({
  modalOpen: store.login.modalOpen,
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

  onSubmitSignUp(email, password) {
    this.props.dispatch(LoginActions.signupRequest(email, password, this.props.auth))
    // this.setState({ isOpen: false })
    // browserHistory.replace('/')
  }

  render() {
    return (
      <Modal open={this.props.modalOpen} size={'small'}>
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
                onChange={() => console.log('YEAH BOIII')}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Email"
                placeholder="barambe@email.com"
                onChange={() => console.log('YEAH BOIII')}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Password"
                placeholder="secret"
                onChange={() => console.log('YEAH BOIII')}
              />
            </Form.Field>
          </Form>
          <Button
            onClick={() => this.onSubmitSignUp('booboo@1.com', '123', this.props.auth)}
          >
            Submit
          </Button>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Signup
