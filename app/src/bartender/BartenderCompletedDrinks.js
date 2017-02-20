import React from 'react'
import { Grid } from 'semantic-ui-react'
import BartenderCompletedPickups from './BartenderCompletedPickups'
import BartenderCompletedTables from './BartenderCompletedTables'

export default () => (
  <Grid.Column width={10} id="done-orders">
    <Grid verticalAlign="middle" columns={2} centered>
      <Grid.Row>
        <BartenderCompletedPickups />
        <BartenderCompletedTables />
      </Grid.Row>
    </Grid>
  </Grid.Column>
)
