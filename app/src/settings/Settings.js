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
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      latitude: '',
      longitude: '',
      barName: '',
    }
  }

  handleChange(e, { value }) {
    this.setState({ ...this.state, state: value })
  }

  handleSearchChange(e, state) {
    this.setState({ state })
  }

  changeFirstName(firstName) {
    console.log('changeFirstName')
    this.setState({ firstName })
  }

  changeLastName(lastName) {
    console.log('changeLastName')
    this.setState({ lastName })
  }

  submit() {
    axios.post('/settings/addBusiness', {
      barName: this.state.barName,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    })
  }

  render() {
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
                <Form.Input onChange={::this.changeFirstName} label="First Name" placeholder="First name" />
                <Form.Input onChange={::this.changeLastName} label="Last Name" placeholder="Last name" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input label="Address" placeholder="" />
              </Form.Group>
              <Form.Group>
                <Form.Input label="City" placeholder="" width={10} />
                <Form.Dropdown
                  label="State"
                  fluid
                  selection
                  search
                  options={this.state.options}
                  value={this.state.value}
                  placeholder="State"
                  onChange={::this.handleChange}
                  onSearchChange={::this.handleSearchChange}
                  width={3}
                />
              </Form.Group>
              <Form.Button onClick={::this.submit}>Submit</Form.Button>
            </Form>
          </Segment>
        </Container>
      </div>
    )
  }
}

export default Settings
