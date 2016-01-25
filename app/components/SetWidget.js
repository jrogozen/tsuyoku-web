import React from 'react'

export default class SetWidget extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const set = this.props.set || []
    const weight = set[0]
    const reps = set.length

    return (
      <li className="set-widget-component">
        <span className="weight">{weight} x </span>
        <span className="reps">{reps}</span>
      </li>
    )
  }
}