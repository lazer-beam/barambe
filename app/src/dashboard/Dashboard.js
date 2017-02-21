import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'
import '../App.css'

import { actions } from './duck.Dashboard'
import MenuItem from './DashboardComponents'
import Bartender from '../bartender/Bartender'
import Drinks from '../drinks/Drinks'

@connect(store => ({
  visible: store.dash.visible,
  currentNav: store.dash.currentNav,
}))
class Dashboard extends Component {

  componentDidMount() {
    console.log('HERE ARE THE PROPS!')
    console.log(this.props)
    if (this.props.currentNav === 'home' && !this.props.visible) {
      setTimeout(() => {
        this.props.dispatch(actions.toggleSidebarOut())
      }, 1000)
    }
  }

  handleMenuClick(e, data, load) {
    this.props.dispatch(actions.navSelection(load))
  }

  handleLogout() {
    console.log('LOGGING OUT!!!')
    this.props.auth.logout()
  }

  render() {
    this.handleMenuClick = ::this.handleMenuClick
    const menuItems = [['home', 'Home', 22], ['beer', 'Bartender', 18], ['edit', 'Edit Drinks', 4]]
    return (
      <div className="allBody">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="overlay" width="thin" visible={this.props.visible} icon="labeled" vertical inverted>
            {menuItems.map(mnuItm => <MenuItem icon={mnuItm[0]} label={mnuItm[1]} key={mnuItm[2]} nav={this.handleMenuClick} />)}
            <Menu.Item onClick={() => ::this.handleLogout()}>
              <Icon name="sign out" />
              Sign Out
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <div className="allBody">

              {this.props.currentNav === 'beer' ? <Bartender /> : null}
              {this.props.currentNav === 'edit' ? <Drinks /> : null}

            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Dashboard
