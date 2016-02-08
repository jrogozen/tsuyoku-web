import React from 'react'
import classnames from 'classnames'

const stylesheet = require('../scss/components/InfoWidget')

export default class InfoWidget extends React.Component {
  getCss() {
    return classnames({
      'info-widget-component': true,
      disabled: this.props.disabled
    })
  }

  render() {
    const { title, value, disabled } = this.props

    if (disabled) {
      return (
        <div className={this.getCss()}>
          <div className="title">{title}</div>
          <div className="value">
            {value ? value : '--'}
          </div>
        </div>
      )
    }

    return (
      <div tabIndex="0" className={this.getCss()}>
        <div className="title">{title}</div>
        <div className="value">
          {value ? value : '--'}
        </div>
      </div>
    )
  }
}