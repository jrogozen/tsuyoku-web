import React from 'react'
import classnames from 'classnames'

const stylesheet = require('../scss/components/InfoWidget')

export default class InfoWidget extends React.Component {
  constructor(props) {
    super(props)
  }

  getCss() {
    return classnames({
      'info-widget-component': true,
      disabled: this.props.disabled
    })
  }

  render() {
    const { value, title, disabled, unit } = this.props

    return (
      <div className={this.getCss()}>
        <div className="title">{title}</div>
          <div className="value">
            {value ? value : '--'} {unit}
          </div>
      </div>
    )
  }
}