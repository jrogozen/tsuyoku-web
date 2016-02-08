import React from 'react'

const stylesheet = require('../scss/components/PopupModal')

export default class PopupModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const children = this.props.children

    {return this.props.isVisible ?
      (
        <div id={this.props.id} className="popup-modal-component">
          {children}
        </div>
      ) : null
    }
  }
}