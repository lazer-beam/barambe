import React, { Component } from 'react'
import { Button, Icon, List } from 'semantic-ui-react'
import '../App.css'


class DrinkItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonActive: false,
    }
  }

  componentDidMount() {
  }

  toggleButton() {
    if (!this.state.buttonActive) {
      this.setState({ buttonActive: !this.state.buttonActive })
    } else {
      this.setState({ buttonActive: !this.state.buttonActive })
    }
  }

  render() {
    const tabId = this.props.order.tabId
    const id = this.props.order.id
    const iconType = (this.props.order.drink.type === 'shot') ? 'lab' : this.props.order.drink.type
    return (
      <Button onClick={() => this.props.removeDrink(tabId, id)}>
        <Button.Content visible>
          <Icon name={iconType} /> {this.props.order.drink.name}
          {this.props.order.drink.liquors && this.props.order.drink.liquors.length ? <br /> : null}
          {this.props.order.drink.liquors && this.props.order.drink.liquors.length ? 'Liquors' : null}
          <List bulleted items={this.props.order.drink.liquors} />
          {this.props.order.drink.addIns && this.props.order.drink.addIns.length ? <br /> : null}
          {this.props.order.drink.addIns && this.props.order.drink.addIns.length ? 'AddIns' : null}
          <List bulleted items={this.props.order.drink.addIns} />
        </Button.Content>
      </Button>
    )
  }
}

export default DrinkItem
