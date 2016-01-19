import React from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'

import * as userActions from '../actions/user'

import { fetch, attemptAuth } from '../utils/fetch'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const dispatch = this.props.dispatch
    const self = this

    fetch({
      method: 'get',
      endpoint: 'users'
    }).then((res) => {
      if (!res.success && res.error.includes('valid user token')) {
        attemptAuth(self.props.user, dispatch, { method: 'get', endpoint: 'users' })
          // .then(() => console.log('woohoo'))
          // .err((err) => { throw err })
      }
    }).catch((err) => {
      console.log('api err', err)
    })

    // fetch('get', 'users')
    //   .then((res) => {
    //     console.log('res!', res)
    //   })
    // if (localStorage.getItem('user')) {
    //   const userInfo = JSON.parse(localStorage.getItem('user'))
    //   const apiRefreshToken = userInfo.api_refresh_token
    //   const userId = userInfo._id

    //   dispatch(userActions.fetchLogin({
    //     api_refresh_token: apiRefreshToken,
    //     userId
    //   }))
    // }

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