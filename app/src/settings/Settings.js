import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Form, Container, Input, Segment, Icon, Message } from 'semantic-ui-react'

import states from '../util/usaStates'
// import { patchBartenderMetadata } from '../util/AuthHelpers'

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
      fullName: '',
      businessName: '',
      address: '',
      city: '',
      state: '',
      latitude: '',
      longitude: '',
      imageUrl: '',
      displaySuccessMsg: false,
      msg: 'We updated our privacy policy here to better service our customers. We recommend reviewing the changes.',
    }

    this.renderMsg = this.renderMsg.bind(this)
  }

  handleChange(e, { value }) {
    this.setState({ ...this.state, state: value })
  }

  handleSearchChange(e, state) {
    this.setState({ state })
  }

  changeFirstName(fullName) {
    this.setState({ fullName })
  }

  changeLastName(barName) {
    this.setState({ barName })
  }

  changeAddress(address) {
    this.setState({ address })
  }

  changeImageUrl(imageUrl) {
    this.setState({ imageUrl })
  }

  changeCity(city) {
    this.setState({ city })
  }


  submit(e) {
    e.preventDefault()
    this.changeStatesOfMsgs()
    // axios.post('/auth/addBusiness', {
    //   fullName: this.state.fullName,
    //   businessName: this.state.businessName,
    //   address: this.state.address,
    //   city: this.state.city,
    //   state: this.state.state,
    //   longitude: this.state.longitude,
    //   latitude: this.state.latitude,
    // })
  }

  changeStatesOfMsgs() {
    this.setState({ displaySuccessMsg: true })

    setTimeout(() => {
      this.setState({ displaySuccessMsg: false })
    }, 3000)
  }

  renderMsg() {
    return (
      <Message success>
        <Message.Header>
          Changes in Service
        </Message.Header>
        <p>
          {this.state.msg}
        </p>
      </Message>
    )
  }

  render() {
    return (
      <div>
        {this.state.displaySuccessMsg && this.renderMsg()}
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
                <Form.Input onChange={::this.changeFirstName} label="Full Name" placeholder="Full Name" />
                <Form.Input onChange={::this.changeLastName} label="Business Name" placeholder="Business Name" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input onChange={::this.changeAddress} label="Address" placeholder="Address" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input onChange={::this.changeImageUrl} label="Image Url" placeholder="http://www.pathtoimg.jpg" />
              </Form.Group>
              <Form.Group>
                <Form.Input onChange={::this.changeCity} label="City" placeholder="City" width={10} />
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
              <Form.Button onClick={e => { this.submit.call(this, e) }} >Submit </Form.Button>
            </Form>
          </Segment>
        </Container>
      </div>
    )
  }
}

export default Settings
