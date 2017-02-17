import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import { actions } from './duck.Drinks'

@connect(store => ({
  currentAddView: store.drinks.currentAddView,
}))
class Drinks extends Component {

  toggleMenu(menuName) {
    this.props.dispatch(actions.toggleMenu(menuName))
  }

  render() {
    const addView = this.props.currentAddView

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item name="beers" active={addView === 'beers'} onClick={() => this.toggleMenu('beers')} />
            <Menu.Item name="liquorAddIns" active={addView === 'liquorAddIns'} onClick={() => this.toggleMenu('liquorAddIns')} />
            <Menu.Item name="cocktails" active={addView === 'cocktails'} onClick={() => this.toggleMenu('cocktails')} />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {addView}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Drinks
