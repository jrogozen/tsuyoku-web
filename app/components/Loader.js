import React from 'react'

const stylesheet = require('../scss/components/Loader')

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader-component">
        <i className="material-icons">timer</i>
      </div>
    )
  }
}