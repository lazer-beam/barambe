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

  findAndRemove(tabId, id) {
    const newOrders = []
    this.props.unfufilledOrders.forEach(item => {
      if (item[0].tabId === tabId) {
        if (item.length > 1) {
          const toChange = item.slice().filter(val => val.id !== id)
          newOrders.push(toChange)
        }
      } else {
        newOrders.push(item.slice())
      }
    })
    this.props.dispatch(actions.removeOrder(newOrders))
  }

  render() {
    const props = {
      removeDrink: ::this.findAndRemove,
    }

    return (
      <Grid columns="equal" relaxed className="revealer">
        <Grid.Column className="revealer bar_queue_container">
          <Header as="h2">
            <Label className="testing" circular size="large" color="red">{this.props.unfufilledOrders.length}</Label>
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
