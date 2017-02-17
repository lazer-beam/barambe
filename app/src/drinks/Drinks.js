import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from './duck.Drinks'

@connect(store => ({
  currentAddView: store.dash.currentNav,
}))
class Drinks extends Component {
  render() {
    
  }
}