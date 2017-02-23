import React, { Component } from 'react'
import { Modal, Header, Form, Button, Divider } from 'semantic-ui-react'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barName: '',
      email: '',
      password: '',
    }
  }

  onSubmit(username, password) {
    this.props.auth.signup('e123@g.com', '123')
  }

  render() {
    return (
      <Modal open size={'small'}>
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
            <Button onClick={() => this.onSubmit()}>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Signup
