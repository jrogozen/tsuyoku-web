import React from 'react'

const stylesheet = require('../scss/components/PopupModal')

export default class PopupModal extends React.Component {
  constructor(props) {
    super(props)

    this.handleKeyDown = (e) => {
      if (e) {
          e.stopPropagation();
      }

      if (this.props.closeKeys.indexOf(e.keyCode) > -1) {
          this.props.closeModal();
      }
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const children = this.props.children

   return (
      <div id={this.props.id} className="popup-modal-component">
        {children}
      </div>
    )
  }
}

PopupModal.PropTypes = {
  closeKeys: React.PropTypes.array,
  closeModal: React.PropTypes.func
}

PopupModal.defaultProps = {
  closeKeys: [27]
}