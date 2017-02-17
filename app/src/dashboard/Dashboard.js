import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar, Segment, Menu } from 'semantic-ui-react'
import '../App.css'

import { actions } from './duck.Dashboard'
import MenuItem from './DashboardComponents'
import Bartender from '../bartender/Bartender'

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
        this.props.dispatch(actions.toggleSidebarIn())
      }, 0)
    }
  }

  render() {
    return (
      <div className="allBody">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="push" width="thin" visible={this.props.visible} icon="labeled" vertical inverted>
            <MenuItem icon="home" label="Home" />
            <MenuItem icon="gamepad" label="Bartender" />
            <MenuItem icon="camera" label="Edit Drinks" />
          </Sidebar>
          <Sidebar.Pusher>
            <div className="allBody">

              <Bartender />

            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Dashboard

