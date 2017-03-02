import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Form, Container, Input, Segment, Icon } from 'semantic-ui-react'
import axios from 'axios'
import states from '../util/usaStates'

@connect(store => ({
  currentAddView: store.drinks.currentAddView,
  beers: store.drinks.menuBeers,
  cocktails: store.drinks.menuCocktails,
  liquors: store.drinks.menuLiquors,
  addIns: store.drinks.menuAddIns,
}))
class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      multiple: false,
      options: states,
      searchQuery: '',
      selectedState: '',
      businessName: '',
      address: '',
      city: '',
      imgUrl: '',
      submitError: null,
      submittedAddress: '',
    }
  }

  handleSelectStateChange(e, { value }) {
    this.setState({ ...this.state, selectedState: value })
  }
  handleStateSearchChange(e, value) {
    this.setState({ searchQuery: value })
  }
  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }
  handleFormSubmit(e) {
    e.preventDefault()
    const infoObj = {
      selectedState: this.state.selectedState,
      businessName: this.state.businessName,
      address: this.state.address,
      city: this.state.city,
      imgUrl: this.state.imgUrl,
    }
    console.log(`Name: ${this.state.businessName}, address: ${this.state.address}, city: ${this.state.city}, state: ${this.state.selectedState}`)
    axios.post('/bars/submitinfo', infoObj)
    .then(res => {
      console.log(res)
      if (this.state.submitError) {
        this.setState({
          submitError: false,
          submittedAddress: res.data.formattedAddress,
        })
      }
    })
    .catch(err => {
      console.log(err)
      if (!this.state.submitError) this.setState({ submitError: true })
    })
  }

  render() {
    let errorMsg = null
    if (this.state.submitError === true) {
      errorMsg = <div className="error">Formatting error -- please re-submit your information</div>
    } else if (this.state.submitError === false) {
      errorMsg = <div className="success">Data received!</div>
    }

    return (
      <div>
        <Container>
          <Header as="h2">
            <Icon name="settings" />
            <Header.Content>
              Account Settings
              <Header.Subheader>
                Manage your preferences
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Header as="h3" attached="top">
            Bar Username
          </Header>
          <Segment attached>
            <p> This is a unique username. Once it is set it cannot be changed.</p>
            <Input action={{ icon: 'search' }} placeholder="Search..." />
          </Segment>
        </Container>
        <Container>
          <Header as="h3" attached="top">
            Setup Stripe Merchant Account
          </Header>
          <Segment attached>
            <Button color="linkedin" href="http://localhost:1337/bars/connect">
              <Icon name="stripe" /> Connect Stripe Account
            </Button>
          </Segment>
        </Container>
        <Container>
          <Header as="h3" attached="top">
            Business Info
          </Header>
          <Segment attached>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  name="businessName"
                  label="Business Name"
                  onChange={::this.handleInputChange}
                  value={this.state.businessName}
                />
                <Form.Input
                  name="imgUrl"
                  label="Url of Banner Image"
                  onChange={::this.handleInputChange}
                  value={this.state.imgUrl}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  name="address"
                  label="Address"
                  onChange={::this.handleInputChange}
                  value={this.state.address}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  name="city"
                  label="City"
                  onChange={::this.handleInputChange}
                  value={this.state.city}
                  width={10}
                />
                <Form.Dropdown
                  label="State"
                  fluid
                  selection
                  search
                  options={this.state.options}
                  value={this.state.selectedState}
                  placeholder="State"
                  onChange={::this.handleSelectStateChange}
                  onSearchChange={::this.handleStateSearchChange}
                  width={3}
                />
              </Form.Group>
              <Form.Button onClick={::this.handleFormSubmit}>Submit</Form.Button>
              {errorMsg}
            </Form>
          </Segment>
        </Container>
      </div>
    )
  }
}

export default Settings
