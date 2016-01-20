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

    fetch(this.props.user, dispatch, {
      method: 'get',
      endpoint: 'users'
    }).then((res) => {
      console.log('app.js works', res)
    }).catch((err) => {
      console.log('app.js failed', err)
    })
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        {React.cloneElement(this.props.children, {
          user: this.props.user,
          dispatch: this.props.dispatch
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)