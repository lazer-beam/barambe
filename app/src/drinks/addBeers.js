import React from 'react'
import { Table, Button, Input, Divider } from 'semantic-ui-react'

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
            {beers.map((beer, i) =>
              <Table.Row key={i}>
                <Table.Cell>
                  {beer.name}
                </Table.Cell>
                <Table.Cell>
                  {beer.price}
                </Table.Cell>
              </Table.Row>,
            )}
          </Table.Body>
          <Divider hidden />
        </Table>

        <Input onChange={this.handleBeerChange} label="Add a Beer" placeholder="Beer Name" />
        <Input onChange={this.handlePriceChange} label="Add price" placeholder="e.g. '3.95'" />
        <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
        <Divider hidden />
      </div>
    )
  }
}


export default AddBeers

