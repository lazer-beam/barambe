import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { browserHistory } from 'react-router'
import { Sidebar, Segment, Menu, Icon, Grid } from 'semantic-ui-react'
import '../App.css'

import LoginActions from '../login/duck.Login'
import { actions } from './duck.Dashboard'
import { actions as BarActions } from '../bartender/duck.Bartender'
import MenuItem from './DashboardComponents'
import Bartender from '../bartender/Bartender'
import Drinks from '../drinks/Drinks'
import Settings from '../settings/Settings'

@connect(store => ({
  visible: store.dash.visible,
  currentNav: store.dash.currentNav,
  fetchedOrders: store.bar.fetchedOrders,
}))

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.currentNav === 'home' && !this.props.visible) {
      setTimeout(() => {
        this.props.dispatch(actions.toggleSidebarOut())
      }, 1000)
    }

    if (!this.props.fetchedOrders) {
      this.props.dispatch(BarActions.fetchOrders())
    }
  }

  componentDidUpdate() {
    console.log(this.props.location.query.query)
    if (this.props.location.query.query !== undefined) {
      console.log('xxxxxxxxxxxxx')
      this.stripe(this.props.location.query.query)
    }
  }

  handleMenuClick(e, data, load) {
    this.props.dispatch(actions.navSelection(load))
  }

  handleLogout() {
    this.props.auth.logout()
    this.props.dispatch(LoginActions.logout())
  }

  stripe(token) {
    axios.get(`/bars/stripe/${token}`, {
      headers: { Authorization: `Bearer ${this.props.auth.getToken()}` },
    }).then(obj => {
      console.log(obj)
      browserHistory.push('/')
    })
  }

  render() {
    const menuItems = [
      ['home', 'Home', 22],
      ['beer', 'Bartender', 18],
      ['edit', 'Edit Drinks', 4],
      ['user', 'Settings', 56]]
    return (
      <div className="allBody">
        <a href="http://localhost:1337/bars/connect">Connect with Stripe</a>
        <Sidebar.Pushable as={Segment}>
          <Grid id="height100">
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
                <Sidebar.Pusher id="height100">
                  <div id="height100">
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
