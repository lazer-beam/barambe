import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar, Segment, Menu, Image, Icon, Header } from 'semantic-ui-react'
import '../App.css'

import { actions } from './duck.Dashboard'

@connect(store => ({
  visible: store.dash.visible,
  currentNav: store.dash.currentNav,
}))
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  componentDidMount() {
    if (this.props.currentNav === 'root' && !this.props.visible) {
      setTimeout(() => {
        this.props.dispatch(actions.toggleSidebarOut())
      }, 800)
    }
  }

  render() {
    // const visible = this.state.visible

    return (
      <div className="allBody">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="push" width="thin" visible={this.props.visible} icon="labeled" vertical inverted>
            <Menu.Item name="home">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item name="gamepad">
              <Icon name="gamepad" />
              Bartender
            </Menu.Item>
            <Menu.Item name="camera">
              <Icon name="camera" />
              Edit Menu
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

