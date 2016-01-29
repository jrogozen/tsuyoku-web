import React from 'react'
import classnames from 'classnames'

const stylesheet = require('../scss/components/Loader')

export default class Loader extends React.Component {
  getCss() {
    return classnames({
      'loader-component': true,
      'entry-loader': this.props.entryLoader
    })
  }
  render() {
    return (
      <div className={this.getCss()}>
        <i className="material-icons">timer</i>
        {this.props.text ? <p>{this.props.text}</p> : null}
      </div>
    )
  }
}