import React from 'react'

import LoginForm from '../components/LoginForm'

const stylesheet = require('../scss/containers/Login')

export default class Login extends React.Component {
  render() {
    const { user, dispatch } = this.props

    return (
      <div id="login-container" className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4">
            <h2>Login or Register your account</h2>
            <LoginForm dispatch={dispatch} user={user} />
          </div>
        </div>
      </div>
    )
  } 
}