import React from 'react'
import { Table, Form, Button, Divider } from 'semantic-ui-react'

const AddCocktails = ({ cocktails }) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={3}>Cocktail</Table.HeaderCell>
        <Table.HeaderCell width={2}>Price</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {cocktails.map(cocktail =>
        <Table.Row>
          <Table.Cell>
            {cocktail.name}
          </Table.Cell>
          <Table.Cell>
            {cocktail.price}
          </Table.Cell>
        </Table.Row>,
      )}
    </Table.Body>
    <Divider hidden />
    <Form>
      <Form size="large" key="large">
        <Form.Group widths="equal">
          <Form.Field label="Add a cocktail" control="input" placeholder="Cocktail Name" />
          <Form.Field label="Add price" control="input" placeholder="e.g. '3.95'" />
        </Form.Group>
        <Button type="submit">Submit</Button>
        <Divider hidden />
      </Form>
    </Form>

  </Table>
)


export default AddCocktails

