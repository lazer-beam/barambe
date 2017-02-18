import React, { Component } from 'react'
import { Table, Button, Input, Divider } from 'semantic-ui-react'
import axios from 'axios'

class AddBeers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      beerName: '',
      beerPrice: '',
    }
    this.handleSubmit = ::this.handleSubmit
    this.handleBeerChange = ::this.handleBeerChange
    this.handlePriceChange = ::this.handlePriceChange
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('Beer ', this.state.beerName, ' costs ', this.state.beerPrice)

    const temp = {
      name: this.state.beerName,
      price: this.state.beerPrice,
      type: 'beer',
    }

    axios.post(drinkPostingEndpoint, temp)
      .then(res => { console.log(res) })
      .catch(err => { console.log(err) })

    this.setState({
      beerName: '',
      beerPrice: '',
    })
  }
  handleBeerChange(event, data) {
    this.setState({ beerName: data.value })
  }
  handlePriceChange(event, data) {
    this.setState({ beerPrice: data.value })
  }
  render() {
    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>Beer</Table.HeaderCell>
              <Table.HeaderCell width={2}>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.beers.map(beer =>
              <Table.Row key={Math.random() * 100}>
                <Table.Cell>
                  {beer.name}
                </Table.Cell>
                <Table.Cell>
                  {beer.price}
                </Table.Cell>
              </Table.Row>,
            )}
          </Table.Body>
        </Table>

        <Input value={this.state.beerName} onChange={this.handleBeerChange} label="Add a Beer" placeholder="Beer Name" />
        <Input value={this.state.beerPrice} onChange={this.handlePriceChange} label="Add price" placeholder="e.g. '3.95'" />
        <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
        <Divider hidden />
      </div>
    )
  }
}


export default AddBeers

