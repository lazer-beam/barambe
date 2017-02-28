import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar, Segment, Menu, Icon, Grid } from 'semantic-ui-react'
import '../App.css'

import LoginActions from '../login/duck.Login'
import { actions } from './duck.Dashboard'
import MenuItem from './DashboardComponents'
import Bartender from '../bartender/Bartender'
import Drinks from '../drinks/Drinks'
import Settings from '../settings/Settings'

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
    this.props.dispatch(LoginActions.logout())
  }

  render() {
    const menuItems = [
      ['home', 'Home', 22],
      ['beer', 'Bartender', 18],
      ['edit', 'Edit Drinks', 4],
      ['user', 'Settings', 56]]
    return (
      <div className="allBody">
        <Sidebar.Pushable as={Segment}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
                <Sidebar as={Menu} animation="overlay" width="thin" visible={this.props.visible} icon="labeled" vertical inverted>

                  {menuItems.map(mnuItm => <MenuItem
                    navClass={this.props.currentNav === mnuItm[0] ? 'selectedNav' : 'unselectedNav'}
                    icon={mnuItm[0]}
                    label={mnuItm[1]}
                    key={mnuItm[2]}
                    nav={::this.handleMenuClick}
                  />)}

                  <Menu.Item onClick={() => this.handleLogout.call(this)}>
                    <Icon name="sign out" />
                    Sign Out
                  </Menu.Item>
                </Sidebar>
              </Grid.Column>
              <Grid.Column width={14}>
                <Sidebar.Pusher>
                  <div>
                    {this.props.currentNav === 'beer' ? <Bartender /> : null}
                    {this.props.currentNav === 'edit' ? <Drinks /> : null}
                    {this.props.currentNav === 'user' ? <Settings /> : null}
                  </div>
                </Sidebar.Pusher>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Dashboard
