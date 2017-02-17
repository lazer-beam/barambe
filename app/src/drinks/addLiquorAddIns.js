import React, { Component } from 'react'
import { Button, Segment, Grid, Input } from 'semantic-ui-react'

class AddLiquorAddIns extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <Grid columns="equal">
          <Grid.Column>
            <Segment.Group>
              <Segment inverted color="grey">
              Liquors
            </Segment>
              {this.props.liquors.map(liquor =>
                <Segment>
                  {liquor.name}: {liquor.price}
                </Segment>,
            )}
              <Segment>
                <Input placeholder="Add a liquor" />
                <Input placeholder='Price (e.g. "3.95")' />
                <Button>Submit</Button>
              </Segment>
            </Segment.Group>
          </Grid.Column>

          <Grid.Column>
            <Segment.Group>
              <Segment inverted color="grey">
              Add-Ins
            </Segment>
              {this.props.addIns.map(addIn =>
                <Segment>
                  {addIn.name}: {addIn.price}
                </Segment>,
            )}
              <Segment>
                <Input placeholder="Add an Add-In" />
                <Input placeholder='Price (e.g. "3.95")' />
                <Button>Submit</Button>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default AddLiquorAddIns

