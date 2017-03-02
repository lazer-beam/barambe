import React, { Component } from 'react'
import { Table, Button, Input } from 'semantic-ui-react'

class AddBeers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      beerName: '',
      beerPrice: '',
    }
    this.handleSubmit = ::this.handleSubmit
    this.handleDelete = ::this.handleDelete
    this.handleBeerChange = ::this.handleBeerChange
    this.handlePriceChange = ::this.handlePriceChange
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('Beer ', this.state.beerName, ' costs ', this.state.beerPrice)
    const temp = {
      name: this.state.beerName,
      textPrice: this.state.beerPrice,
      price: parseFloat(this.state.beerPrice) * 100,
      type: 'beer',
    }
    console.log('Submitting this beer: ', JSON.stringify(temp))
    this.props.submitAction(temp)
    this.setState({
      beerName: '',
      beerPrice: '',
    })
  }
  handleDelete(beer) {
    console.log('Beer to delete: ', beer)
    this.props.deleteAction(beer)
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
        <Input value={this.state.beerName} onChange={this.handleBeerChange} label="Add a Beer" placeholder="Beer Name" />
        <Input value={this.state.beerPrice} onChange={this.handlePriceChange} label="Add price" placeholder="e.g. '3.95'" />
        <Button color="black" type="submit" onClick={this.handleSubmit}>Submit</Button>
        <Table celled striped>
          <div className="overflowTable">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell inverted width={3}>Beer</Table.HeaderCell>
                <Table.HeaderCell width={2}>Price</Table.HeaderCell>
                <Table.HeaderCell width={2}>Click to delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body className="overflowTable">
              {this.props.beers.map(beer =>
                <Table.Row key={Math.random() * 100}>
                  <Table.Cell>
                    {beer.name}
                  </Table.Cell>
                  <Table.Cell>
                    {beer.price}
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={this.handleDelete.bind(this, beer)}>Remove</Button>
                  </Table.Cell>
                </Table.Row>,
              )}
            </Table.Body>
          </div>
        </Table>
      </div>
    )
  }
}


export default AddBeers

