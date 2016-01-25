import React from 'react'

import SetWidget from './SetWidget'

export default class LiftWidget extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, sets } = this.props

    return (
      <div className="lift-widget-component widget">
        <div>{title}</div>
        <div>
          <ul>
            {sets.map((set, i) => {
              return <SetWidget set={set} key={i} />
            })}
          </ul>
        </div>
      </div>
    )
  }
}