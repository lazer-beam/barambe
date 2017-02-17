import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

class DrinkGroup extends Component {
  constructor(props) {
    super(props)
    this.state = { test: '111' }
  }
  render() {
    return (
      <div>
        <Segment color="red" attached>
          YAY!
        </Segment>
      </div>
    )
  }
}

export default DrinkGroup
