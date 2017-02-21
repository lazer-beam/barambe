import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Label, Divider, Header } from 'semantic-ui-react'
import '../App.css'

import { actions } from './duck.Bartender'
import DrinkGroup from './BartenderDrinkGroup'
import CompletedDrinks from './BartenderCompletedDrinks'

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

  numOfOrders() {
    return this.props.unfufilledOrders.reduce((numOfOrders, currTab) => numOfOrders + currTab.length, 0)
  }

  render() {
    const props = {
      removeDrink: ::this.findAndRemove,
    }
    return (
      <Grid>
        <Grid.Row>
          <CompletedDrinks />
          <Grid.Column width={4} id="bar_queue_container" className="revealer">
            <Header as="h2">
              <Label className="testing" circular size="large" color="red">{this.numOfOrders()}</Label>
              <Header.Content>
                Bar Queue
              </Header.Content>
            </Header>
            <Divider />
            {this.props.unfufilledOrders.map(tab => <DrinkGroup {...props} key={tab[0].id} tab={tab} />)}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Bartender
