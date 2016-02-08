import React from 'react'

const stylesheet = require('../scss/components/InputText')

export default class InputText extends React.Component {
  constructor(props) {
    super(props)

    this.input = this.props.value

    this.state = {
      error: false,
      focus: false
    }

    this.handleFocusState = () => {
      const state = Object.assign({}, this.state)

      state.focus = !state.focus
      this.setState(state)
    }
  }

  getValue() {
    return this.input.value;
  }

  getError() {
    return this.state.error;
  }

  render() {
    return (
      <div className="input-text-component">
        <input
          onFocus={this.handleFocusState}
          onBlur={this.handleFocusState}
          ref={(ref) => this.input = ref}
          type={this.props.type} >
        </input>
        <label className={this.state.focus ? 'filled' : ''}>{this.props.label}</label>
      </div>
    )
  }
}

InputText.defaultProps = {
  type: 'text',
  label: 'input'
}