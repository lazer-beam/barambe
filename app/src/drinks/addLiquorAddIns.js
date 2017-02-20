import React, { Component } from 'react'
import { Button, Segment, Grid, Input, Checkbox } from 'semantic-ui-react'

class AddLiquorAddIns extends Component {
  constructor(props) {
    super(props)

    this.state = {
      liquorName: '',
      liquorPrice: '',
      shotPrice: '',
      addInName: '',
      addInPrice: '',
    }
    this.handleLiquorSubmit = ::this.handleLiquorSubmit
    this.handleLiquorChange = ::this.handleLiquorChange
    this.handleLiquorPriceChange = ::this.handleLiquorPriceChange
    this.handleShotPriceChange = ::this.handleShotPriceChange
    this.handleAddInSubmit = ::this.handleAddInSubmit
    this.handleAddInChange = ::this.handleAddInChange
    this.handleAddInPriceChange = ::this.handleAddInPriceChange
    this.handleCheckShot = ::this.handleCheckShot
  }

  handleLiquorSubmit(e) {
    e.preventDefault()
    console.log('This liquor, ', this.state.liquorName, ', costs ', this.state.liquorPrice)

    const temp = {
      name: this.state.liquorName,
      liquorPrice: parseFloat(this.state.liquorPrice) * 100,
    }

    if (this.state.shotPrice) {
      temp.type = 'shot'
      temp.shotPrice = parseFloat(this.state.shotPrice) * 100
    } else {
      temp.type = 'liquor'
    }

    this.setState({
      liquorName: '',
      liquorPrice: '',
      shotPrice: '',
      shotDisable: true,
    })
    this.props.submitAction(temp, temp)
  }
  handleAddInSubmit(e) {
    e.preventDefault()
    console.log('This add-in, ', this.state.addInName, ', costs ', this.state.addInPrice)

    const temp = {
      name: this.state.addInName,
      price: this.state.addInPrice,
      type: 'addIn',
    }
    this.props.submitAction(temp, 'addIn')
    this.setState({
      addInName: '',
      addInPrice: '',
    })
  }
  handleLiquorChange(event, data) {
    this.setState({ liquorName: data.value })
  }
  handleLiquorPriceChange(event, data) {
    this.setState({ liquorPrice: data.value })
  }
  handleShotPriceChange(event, data) {
    this.setState({ shotPrice: data.value })
  }
  handleCheckShot() {
    this.setState({ shotDisable: !this.shotDisable })
  }
  handleAddInChange(event, data) {
    this.setState({ addInName: data.value })
  }
  handleAddInPriceChange(event, data) {
    this.setState({ addInPrice: data.value })
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
              <Segment>
                <Input value={this.state.liquorName} onChange={this.handleLiquorChange} label="Add a liquor" placeholder="Liquor Name" />
                <Input value={this.state.liquorPrice} onChange={this.handleLiquorPriceChange} label="Price (as add-in)" placeholder='e.g. "3.95"' />
                <Input value={this.state.shotPrice} onChange={this.handleShotPriceChange} label="Price (as shot)" placeholder="blank for non-shot" disabled={this.shotDisabled} />
                <Button type="submit" onClick={this.handleLiquorSubmit}>Submit</Button>
                <Checkbox label="Will this be a shot?" onChange={this.handleCheckBox} />
              </Segment>
              {this.props.liquors.map(liquor =>
                <Segment key={Math.random() * 100}>
                  {liquor.name}: {liquor.price}
                </Segment>,
            )}
            </Segment.Group>
          </Grid.Column>

          <Grid.Column>
            <Segment.Group>
              <Segment inverted color="grey">
              Add-Ins
            </Segment>
              <Segment>
                <Input value={this.state.addInName} onChange={this.handleAddInChange} label="Add an add-in" placeholder="Add-In Name" />
                <Input value={this.state.addInPrice} onChange={this.handleAddInPriceChange} label="Add price" placeholder='e.g. "3.95"' />
                <Button type="submit" onClick={this.handleAddInSubmit}>Submit</Button>
              </Segment>
              {this.props.addIns.map(addIn =>
                <Segment key={Math.random() * 100}>
                  {addIn.name}: {addIn.price}
                </Segment>,
            )}
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default AddLiquorAddIns

