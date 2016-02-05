import React from 'react'

export default class InputText extends React.Component {
  constructor(props) {
    super(props)

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
      <div className="input-group">
        <input
          onFocus={this.handleFocusState}
          onBlur={this.handleFocusState}
          ref={(ref) => this.input = ref}
          type={this.props.ref} />
        <label className={this.state.focus ? 'filled' : ''}>{this.props.label}</label>
      </div>
    )
  }
}

InputText.defaultProps = {
  type: 'text',
  label: 'input'
}