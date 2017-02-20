import React from 'react'
import { Grid, Table } from 'semantic-ui-react'

export default () => (
  <Grid.Column>
    <Table inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Table Completed</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Table 3</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Table 13</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Table 8</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Grid.Column>
)
