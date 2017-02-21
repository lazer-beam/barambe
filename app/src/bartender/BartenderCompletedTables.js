import React from 'react'
import { Grid, Table } from 'semantic-ui-react'
import DrinkGroup from './BartenderDrinkGroup'

export default props => (
  <Grid.Column>
    <Table inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Table‘s Completed</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.completedTables.length ? props.completedTables.map(tab => <DrinkGroup {...props} key={tab[0].id} tab={tab} />) : null}
      </Table.Body>
    </Table>
  </Grid.Column>
)
