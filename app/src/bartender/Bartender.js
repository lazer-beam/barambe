import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Label, Divider, Header } from 'semantic-ui-react'
import '../App.css'


import { actions } from './duck.Bartender'
import DrinkGroup from './BartenderDrinkGroup'

@connect(store => ({
  visible: store.dash.visible,
  unfufilledOrders: store.bar.unfufilledOrders,
}))
class Bartender extends Component {
  componentDidMount() {
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
        <Grid.Column />
        <Grid.Column className="revealer" width={5}>
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
