import React, { Component } from 'react'
import { Header, Table } from 'semantic-ui-react'

class AddLiquorAddIns extends Component {

  componentDidMount() {}
  render() {
    return (
    <div>
      <Table basic="very" collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>Liquor Name</Table.HeaderCell>
              <Table.HeaderCell width={2}>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                Rum
              </Table.Cell>
              <Table.Cell>
                $22
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Vodka
              </Table.Cell>
              <Table.Cell>
                $15
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Tequila
              </Table.Cell>
              <Table.Cell>
                $12
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Sake
              </Table.Cell>
              <Table.Cell>
                $11
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Table basic="very" collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>Add-In Name</Table.HeaderCell>
              <Table.HeaderCell width={2}>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                Olives
              </Table.Cell>
              <Table.Cell>
                $0
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Cherries
              </Table.Cell>
              <Table.Cell>
                $0
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Gummy Bears
              </Table.Cell>
              <Table.Cell>
                $0
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Gold Bullion
              </Table.Cell>
              <Table.Cell>
                $1100
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default AddLiquorAddIns

