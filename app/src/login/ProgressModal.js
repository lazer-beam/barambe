import React, { Component } from 'react'
import { Modal, Progress } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import '../App.css'

import LoginActions from './duck.Login'

@connect(store => ({
  progressModalPercent: store.progressModalPercent,
}))
class ProgressModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 50,
    }
  }

  handleClose() {
    this.props.dispatch(LoginActions.closeLoginModal())
  }

  render() {
    return (
      <div>
        <Modal
          basic
          dimmer="blurring"
          open
        >
          <Modal.Content>
            <Progress
              percent={this.state.percent}
              size="large"
              inverted
              color="teal"
              indicating
            >
            Doing Stuff
            </Progress>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default ProgressModal
