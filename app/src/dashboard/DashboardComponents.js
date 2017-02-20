import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon } from 'semantic-ui-react'

@connect(store => ({
  visible: store.dash.visible,
  currentNav: store.dash.currentNav,
}))

class DashboardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { nav: props.nav }
  }

  render() {
    return (
      <Menu.Item
        className={this.props.currentNav === this.props.icon ? 'selectedNav' : 'unselectedNav'}
        onClick={(e, data) => this.state.nav(e, data, this.props.icon)}
        name={this.props.icon}>
        <Icon name={this.props.icon} />{this.props.label}
      </Menu.Item>
    )
  }
}
export default DashboardComponent
