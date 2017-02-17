import React, { Component } from 'react'
import { Table, Input, Button, Divider } from 'semantic-ui-react'

class AddCocktails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cocktailName: '',
      cocktailPrice: '',
    }
    this.handleSubmit = ::this.handleSubmit
    this.handleCocktailChange = ::this.handleCocktailChange
    this.handlePriceChange = ::this.handlePriceChange
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('Cocktail ', this.state.cocktailName, ' costs ', this.state.cocktailPrice)
  }
  handleCocktailChange(event, data) {
    this.setState({ cocktailName: data.value })
  }
  handlePriceChange(event, data) {
    this.setState({ cocktailPrice: data.value })
  }
  render() {
    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>Cocktail</Table.HeaderCell>
              <Table.HeaderCell width={2}>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.cocktails.map((cocktail, i) =>
              <Table.Row key={i}>
                <Table.Cell>
                  {cocktail.name}
                </Table.Cell>
                <Table.Cell>
                  {cocktail.price}
                </Table.Cell>
              </Table.Row>,
            )}
          </Table.Body>
        </Table>

        <Input onChange={this.handleCocktailChange} label="Add a cocktail" placeholder="Cocktail Name" />
        <Input onChange={this.handlePriceChange} label="Add price" placeholder="e.g. '3.95'" />
        <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
        <Divider hidden />
      </div>
    )
  }
}


export default AddCocktails

