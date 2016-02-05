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

  // todo: click to change (update user info)

  render() {
    const { title, value, disabled } = this.props

    return (
      <div className={this.getCss()}>
        <div className="title">{title}</div>
        <div className="value">{value ? value : '--'}</div>
      </div>
    )
  }
}