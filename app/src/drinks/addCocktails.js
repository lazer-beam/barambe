import React, { Component } from 'react'
import { Table, Input, Button, Dropdown } from 'semantic-ui-react'

class AddCocktails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cocktailName: '',
      cocktailPrice: '',
      cocktailLiquors: [],
      cocktailAddIns: [],
    }
    this.handleSubmit = ::this.handleSubmit
    this.handleDelete = ::this.handleDelete
    this.handleCocktailChange = ::this.handleCocktailChange
    this.handlePriceChange = ::this.handlePriceChange
    this.handleLiquorChange = ::this.handleLiquorChange
    this.handleAddInsChange = ::this.handleAddInsChange
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('Cocktail ', this.state.cocktailName, ' costs ', this.state.cocktailPrice)
    const temp = {
      name: this.state.cocktailName,
      textPrice: this.state.cocktailPrice,
      price: parseFloat(this.state.cocktailPrice) * 100,
      liquors: this.state.cocktailLiquors,
      addIns: this.state.cocktailAddIns,
      type: 'cocktail',
    }
    this.setState({
      cocktailName: '',
      cocktailPrice: '',
      cocktailLiquors: [],
      cocktailAddIns: [],
    })
    this.props.submitAction(temp)
  }
  handleDelete(cocktail) {
    console.log('cocktail to delete: ', cocktail)
    this.props.deleteAction(cocktail)
  }
  handleCocktailChange(event, data) {
    this.setState({ cocktailName: data.value })
  }
  handlePriceChange(event, data) {
    this.setState({ cocktailPrice: data.value })
  }
  handleLiquorChange(event, data) {
    this.setState({ cocktailLiquors: data.value })
  }
  handleAddInsChange(event, data) {
    this.setState({ cocktailAddIns: data.value })
  }
  render() {
    const liquorOptions = this.props.liquors.map(liquor => {
      return {
        key: liquor.name,
        text: liquor.name,
        value: liquor.name,
      }
    })

    const addInOptions = this.props.addIns.map(addIn => {
      return {
        key: addIn.name,
        text: addIn.name,
        value: addIn.name,
      }
    })
    return (
      <div>
        <Input value={this.state.cocktailName} onChange={this.handleCocktailChange} label="Add a cocktail" placeholder="Cocktail Name" />
        <Input value={this.state.cocktailPrice} onChange={this.handlePriceChange} label="Add price" placeholder="e.g. '3.95'" />
        <div className="dropdownContainer">
          <Dropdown placeholder="Select Liquors" onChange={this.handleLiquorChange} fluid multiple search selection options={liquorOptions} />
          <Dropdown placeholder="Select Add-Ins" onChange={this.handleAddInsChange} fluid multiple search selection options={addInOptions} />
        </div>
        <Button color="black" type="submit" onClick={this.handleSubmit}>Submit</Button>
        <Table celled striped>
          <div className="overflowTable">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2}>Cocktail</Table.HeaderCell>
                <Table.HeaderCell width={3}>Liquors</Table.HeaderCell>
                <Table.HeaderCell width={3}>Add-Ins</Table.HeaderCell>
                <Table.HeaderCell width={2}>Price</Table.HeaderCell>
                <Table.HeaderCell width={2}>Click to delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body >
              {this.props.cocktails.map(cocktail =>
                <Table.Row key={Math.random() * 100}>
                  <Table.Cell>
                    {cocktail.name}
                  </Table.Cell>
                  <Table.Cell>
                    {cocktail.liquors === 1 ? cocktail.liquors : cocktail.liquors.join(', ')}
                  </Table.Cell>
                  <Table.Cell>
                    {cocktail.addIns.length === 1 ? cocktail.addIns : cocktail.addIns.join(', ')}
                  </Table.Cell>
                  <Table.Cell>
                    {cocktail.price}
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={this.handleDelete.bind(this, cocktail)}>Remove</Button>
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


export default AddCocktails

