import React from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'

import * as userActions from '../actions/user'

import fetch from '../utils/fetch'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const dispatch = this.props.dispatch
    const self = this

    // todo: api should accept access_token for login (auth)
    // attempt login with localStorage here
    // const storedUser = localStorage.getItem('user')

    // if (localStorage.getItem('user')) {
    //   let accessToken
    //   try {
    //     accessToken = JSON.parse(storedUser).api_access_token
    //   } catch(err) {
    //     accessToken = null
    //   }

    //   if (accessToken) {
    //     dispatch(userActions.fetchLogin({api_access_token: accessToken}))
    //   }

    // }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        {React.cloneElement(this.props.children, {
          user: this.props.user,
          workouts: this.props.workouts,
          dispatch: this.props.dispatch
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    workouts: state.workouts
  }
}

export default connect(mapStateToProps)(App)