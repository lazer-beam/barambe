import React, { Component } from 'react'
import { Modal, Progress } from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../App.css'

@connect(store => ({
  progressModalPercent: store.login.progressModalPercent,
}))
class ProgressModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      currentProg: 0,
    }
  }

  componentDidMount() { this.increment() }

  componentDidUpdate() {
    console.log('Progress: ', this.state.progress)
    console.log('Current: ', this.state.currentProg)
    console.log('----------------------------------')
    this.increment()
  }

  increment() {
    if (this.state.currentProg !== this.props.progressModalPercent) {
      this.setState({ ...this.state, currentProg: this.props.progressModalPercent })
    }
    if (this.state.progress < this.state.currentProg) {
      setTimeout(() => {
        const newProgress = this.state.progress + 1
        this.setState({ ...this.state, progress: newProgress })
      }, 100)
    }
  }

  render() {
    return (
      <div>
        <Modal basic dimmer="blurring" open>
          <Modal.Content>
            <Progress
              percent={this.state.progress}
              size="large"
              inverted
              color="teal"
              indicating
            >
              {this.props.label}
            </Progress>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default ProgressModal
