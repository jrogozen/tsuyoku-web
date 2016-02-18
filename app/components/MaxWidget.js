import React from 'react'

import { getOneRepMax } from '../utils/weight'

const stylesheet = require('../scss/components/MaxWidget')

export default class MaxWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      error: false,
      isLoading: false
    }

    this.handleSaveClick = () => {
      const saveAction = this.props.saveAction

      this.setState({ error: false })

      // todo: implement error display
      if (!this.reps.value || this.reps.value > 10 || !this.weight.value) {
        return this.setState({ error: 'Must enter valid rep and weight values.' })
      }

      const max = getOneRepMax(this.reps.value, this.weight.value)

      this.setState({ isLoading: true })

      saveAction(this.props.liftName, max)
        .then(() => this.setState({ isLoading: false, isEditing: false }))
    }
  }

  reps: null;
  weight: null;

  render() {
    const { isEditing, isLoading } = this.state
    const { currentMax, reps, weight, liftName } = this.props
    return (
      <div className="max-widget-component widget">
        <p className="max-widget-title">
          {liftName} - <a className="" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>{this.state.isEditing ? 'cancel' : 'edit'}</a>
        </p>
        {isEditing ?
          <div className="max-widget-edit-group">
            <input maxLength="2" type="text" ref={(ref) => this.reps = ref} /> reps @
            <input maxLength="3" type="text" ref={(ref) => this.weight = ref} /> lb
            <button onClick={this.handleSaveClick} className="success inline">{isLoading ? 'saving...' : 'save'}</button>
          </div> :
          <div className="max-widget-current">
            {currentMax || '--'} lb
          </div>
        }
      </div>
    )
  }
}

MaxWidget.PropTypes = {
  liftName: React.PropTypes.string,
  currentMax: React.PropTypes.number
}