import React from 'react'
import { Grid, Table } from 'semantic-ui-react'
import DrinkGroup from './BartenderDrinkGroup'

export default props => {
  const removeCompleteKeyFromOrders = () => props.completedPickups.map(tab => tab.map(order => {
    delete order.complete
    return order
  }))

  return (
    <Grid.Column id="completed-table">
      <Table inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Pickup‘s Completed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.completedPickups.length ? removeCompleteKeyFromOrders().map(tab => <DrinkGroup {...props} key={tab[0].id} tab={tab} />) : null}
        </Table.Body>
      </Table>
    </Grid.Column>)
}
