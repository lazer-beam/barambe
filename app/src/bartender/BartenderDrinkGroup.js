import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import '../App.css'

import DrinkItem from './BartenderDrinkItem'

class DrinkGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // If any buttons are slid open, this becomes true
      oneIsOpen: false,
    }
  }

  render() {
    const order = this.props.orders[0]
    const color = order.tableNum ? 'teal' : 'blue'
    const labelTxt = order.tableNum ? `Table ${order.tableNum}` : `Pickup #${order.customerNum}`

    return (
      <div className="revealer">
        <Button.Group className="revealer" fluid attached="top" vertical>
          <Button color={color}>{labelTxt}</Button>
          {this.props.orders.map(item => <DrinkItem removeDrink={this.props.removeDrink} key={item.id} color={color} order={item} />)}
        </Button.Group>
      </div>
    )
  }
}

export default DrinkGroup
