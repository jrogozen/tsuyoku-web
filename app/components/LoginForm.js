import React from 'react'
import classnames from 'classnames'
import { routeActions as route } from 'react-router-redux'
import { Link } from 'react-router'

import Loader from './Loader'
import InputText from './InputText'

import * as userActions from '../actions/user'

const stylesheet = require('../scss/components/LoginForm')

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false
    }

    this.handleSubmit = (e) => {
      e.preventDefault()

      this.setState( { error: false })

      const dispatch = this.props.dispatch
      const email = this.refs.email.getValue()
      const password = this.refs.password.getValue()

      if (!email || !password) {
        return
      }

      dispatch(userActions.fetchLogin({ email, password }))
        .then(() => {
          if (!this.props.isAuthenticated) {
            this.setState({ error: true })
          }
        })
    }
  }

  componentWillMount() {
    const dispatch = this.props.dispatch

    if (this.props.user.isAuthenticated) {
      dispatch(route.push('/dashboard'))
    }
  }

  componentWillReceiveProps(nextProps) {
    const dispatch = this.props.dispatch

    if (nextProps.user.isAuthenticated) {
      dispatch(route.push('/dashboard'))
    }
  }

  render() {
    const { user, dispatch } = this.props

    return (
      <form className="login-form-component">
        <InputText
          ref="email"
          type="email"
          label="email" />
        <InputText
          ref="password"
          type="password"
          label="password" />
        <div className="button-group">
        <button className="alert" onClick={this.handleSubmit}>
          Login
        </button>
        {this.state.error ?
          <div className="error-message">
            Error logging in, please try again.
          </div> : null
        }
        {user.isWaiting ?
          <Loader /> : null
        }
        </div>
      </form>
    )
  }
}

