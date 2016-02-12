import React from 'react'
import classnames from 'classnames'

const stylesheet = require('../scss/components/InfoWidget')

export default class InfoWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false
    }

    this.handleClick = () => {
      if (!this.state.isEditing) {
        window.addEventListener('keydown', this.handleSave)
      } else {
        window.removeEventListener('keydown', this.handleSave)
      }
      this.setState({
        isEditing: !this.state.isEditing
      })
    }

    this.handleSave = (e) => {
      const saveAction = this.props.saveAction

      if (e.keyCode === 27) {
        this.handleClick()
      } else if (e.keyCode === 13) {
        saveAction(this.props.title, this.input.value)
        this.handleClick()
      }
    }
  }

  getCss() {
    return classnames({
      'info-widget-component': true,
      disabled: this.props.disabled
    })
  }

  showInput() {
    return (
      <div className="value editing">
        <input maxLength="3" type="text" ref={(ref) => this.input = ref} /> {this.props.unit}
      </div>
    )
  }

  render() {
    const { value, title, disabled, unit } = this.props
    const { isEditing } = this.state

    return (
      <div className={this.getCss()}>
        <div className="title">{title}</div>
        {isEditing ?
          this.showInput() :
          <div onClick={this.handleClick} className="value">
            {value ? value : '--'} {unit}
          </div>
        }
      </div>
    )
  }
}