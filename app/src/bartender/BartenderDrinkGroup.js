import React, { Component } from 'react'
// import { connect } from 'react-redux'
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
    this.formatCompletedDrinksLast = ::this.formatCompletedDrinksLast
  }

  formatCompletedDrinksLast() {
    return this.props.tab.filter(order => !order.complete).concat(this.props.tab.filter(order => order.complete))
  }

  render() {
    const firstOrder = this.props.tab[0]
    const color = firstOrder.tableNum ? 'teal' : 'blue'
    const labelTxt = firstOrder.tableNum ? `Table ${firstOrder.tableNum}` : `Pickup #${firstOrder.customerNum}`

    return (
      <div className="revealer">
        <Button.Group className="revealer" fluid attached="top" vertical>
          <Button color={color}>{labelTxt}</Button>
          {this.formatCompletedDrinksLast().map(order => <DrinkItem removeDrink={this.props.removeDrink} key={order.id} color={color} order={order} />)}
        </Button.Group>
      </div>
    )
  }
}

export default DrinkGroup
