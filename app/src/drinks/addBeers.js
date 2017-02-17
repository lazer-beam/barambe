import React from 'react'
import { Table } from 'semantic-ui-react'

const AddBeers = ({ beers }) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={3}>Beer</Table.HeaderCell>
        <Table.HeaderCell width={2}>Price</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {beers.map(beer =>
        <Table.Row>
          <Table.Cell>
            {beer.name}
          </Table.Cell>
          <Table.Cell>
            {beer.price}
          </Table.Cell>
        </Table.Row>,
      )}
    </Table.Body>

  </Table>
)


export default AddBeers

