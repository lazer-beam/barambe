import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'
import '../App.css'

// import { actions } from './duck.Bartender'

@connect(store => ({
  visible: store.dash.visible,
  incOrders: store.dash.currentNav,
}))
class Bartender extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Grid columns="equal" relaxed className="outliner">
        <Grid.Column className="outliner">
          <Image src="http://semantic-ui.com/images/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column className="outliner" width={7}>
          <Image src="http://semantic-ui.com/images/wireframe/media-paragraph.png" />
        </Grid.Column>
      </Grid>
    )
  }
}

export default Bartender
