import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Header, Container, Input, Segment, Icon } from 'semantic-ui-react'

@connect(store => ({
  currentAddView: store.drinks.currentAddView,
  beers: store.drinks.menuBeers,
  cocktails: store.drinks.menuCocktails,
  liquors: store.drinks.menuLiquors,
  addIns: store.drinks.menuAddIns,
}))
class Settings extends Component {
  test() {
    
  }

  render() {
    return (
      <div>
        <Container>
          <Header as="h3">
            <Icon name="settings" />
            <Header.Content>
              Account Settings
              <Header.Subheader>
                Manage your preferences
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Header as="h2" attached="top">
            Bar Username
          </Header>
          <Segment attached>
            <p> This is a unique username. Once it is set it cannot be changed.</p>
            <Input action={{ icon: 'search' }} placeholder="Search..." />
          </Segment>
        </Container>
      </div>
    )
  }
}

export default Settings
