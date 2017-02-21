import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default ({ doneOrders }) => (
  <Button.Group className="revealer" fluid attached="top" vertical id="orders-curr-completing">
    <Button color="black" >Complete</Button>
    {doneOrders.map(doneOrder => (<Button>
      <Button.Content visible>
        <Icon name={'beer'} /> {doneOrder}
      </Button.Content>
    </Button>
    ))}
  </Button.Group>
)
