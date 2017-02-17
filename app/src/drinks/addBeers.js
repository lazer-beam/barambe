import React from 'react'
import { Table, Form, Button, Divider } from 'semantic-ui-react'

const AddBeers = ({ beers }) => (
  <div>
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
      <Divider hidden />
    </Table>
    <Form>
      <Form size="large" key="large">
        <Form.Group widths="equal">
          <Form.Field name="beerName" label="Add a beer" control="input" placeholder="Beer Name" />
          <Form.Field label="Add price" control="input" placeholder="e.g. '3.95'" />
        </Form.Group>
        <Button type="submit">Submit</Button>
        <Divider hidden />
      </Form>
    </Form>
  </div>
)


export default AddBeers

