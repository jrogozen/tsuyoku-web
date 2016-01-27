import React from 'react'

import SetWidget from './SetWidget'

import { capitalize } from '../utils/format'

const stylesheet = require('../scss/components/LiftWidget.scss')

export default class LiftWidget extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { lift, updateGuideState } = this.props
    const { type, title, sets, liftName } = lift

    return (
      <div className="lift-widget-component widget">
        <div className="title">{capitalize(title)}</div>
        <div>
          <ul>
            {sets.map((set, i) => {
              return (
                <SetWidget
                  lift={{
                    type, title, set, liftName
                  }}
                  updateGuideState={updateGuideState}
                  liftKey={i}
                />
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}