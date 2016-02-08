import React from 'react'

import InputText from './InputText'

export default class UserForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }

    this.handleClick = (e) => {
      e.preventDefault()
      console.log(this.refs.email.getValue())
    }
  }

  render() {
    return (
      <form className="user-form-component">
        <InputText ref="email" value={'hi'} label="email" type="email" />
        <InputText ref="age" label="number" type="age" />
        <InputText ref="password" label="password" type="password" />
        <InputText ref="passwordConfirmation" label="confirm password" type="password" />
        <button onClick={this.handleClick}>Click me</button>
      </form>
    )
  }
}