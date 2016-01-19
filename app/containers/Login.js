import React from 'react'

import LoginForm from '../components/LoginForm'

export default class Login extends React.Component {
  render() {
    const { user, dispatch } = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h2>Login</h2>
            <LoginForm dispatch={dispatch} user={user} />
          </div>
        </div>
      </div>
    )
  }
}