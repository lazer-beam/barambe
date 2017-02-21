import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Label, Divider, Header } from 'semantic-ui-react'
import '../App.css'

import { actions } from './duck.Bartender'
import DrinkGroup from './BartenderDrinkGroup'

@connect(store => ({
  visible: store.dash.visible,
  unfufilledOrders: store.bar.unfufilledOrders,
  fetchedOrders: store.bar.fetchedOrders,
}))

class Bartender extends Component {
  componentDidMount() {
    if (!this.props.fetchedOrders) {
      this.props.dispatch(actions.fetchOrders())
    }
  }

  render() {
    const props = {
      removeDrink: ::this.findAndRemove,
    }
    console.log('this.props.unfufilledOrders in render', this.props.unfufilledOrders)
    return (
      <Grid columns="equal" relaxed className="revealer">
        <Grid.Column />
        <Grid.Column className="revealer bar_queue_container" width={5}>
          <Header as="h2">
            <Label className="testing" circular size="large" color="red">6</Label>
            <Header.Content>
              Bar Queue
            </Header.Content>
          </Header>
          <Divider />
          {this.props.unfufilledOrders.map(orders => <DrinkGroup {...props} key={orders[0].id} orders={orders} />)}
        </Grid.Column>
      </Grid>
    )
  }
}

export default Bartender
