import React from 'react'
import { Grid, Table } from 'semantic-ui-react'

export default () => (
  <Grid.Column>
    <Table inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Pickup‘s Completed</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* <Table.Row>
          <Table.Cell textAlign="center">Pickup #5</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell textAlign="center">Pickup #9</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell textAlign="center">Pickup #1</Table.Cell>
        </Table.Row>*/}
      </Table.Body>
    </Table>
  </Grid.Column>
)
