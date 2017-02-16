import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import '../App.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  componentDidMount() {
    if (!this.state.visible) {
      setTimeout(::this.toggleVisibility, 1000)
    }
  }

  toggleVisibility() { this.setState({ visible: true }) }

  render() {
    const visible = this.state.visible

    return (
      <div className="allBody">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="push" width="thin" visible={visible} icon="labeled" vertical inverted>
            <Menu.Item name="home">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item name="gamepad">
              <Icon name="gamepad" />
              Games
            </Menu.Item>
            <Menu.Item name="camera">
              <Icon name="camera" />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <div className="allBody">
              <Header as="h3">Application Content</Header>
              <Image src="http://semantic-ui.com/images/wireframe/paragraph.png" />
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Dashboard
