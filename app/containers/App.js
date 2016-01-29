import React from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Loader from '../components/Loader'

import * as userActions from '../actions/user'
import * as appActions from '../actions/app'

import fetch from '../utils/fetch'
import setTimer from '../utils/timer'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const dispatch = this.props.dispatch
    const storedUser = localStorage.getItem('user')

    if (localStorage.getItem('user')) {
      let accessToken

      try {
        accessToken = JSON.parse(storedUser).api_access_token
      } catch(err) {
        accessToken = null
      }

      if (accessToken) {
        dispatch(userActions.fetchLogin())
          .then(() => dispatch(appActions.setAppBool('isPending', false)))
      }
    } else {
      dispatch(appActions.setAppBool('isPending', false))
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <Header />
              {this.props.app.isPending ?
                <Loader entryLoader /> : null
              }
            </div>
          </div>
        </div>
        {!this.props.app.isPending ?
          React.cloneElement(this.props.children, {
            app: this.props.app,
            user: this.props.user,
            guide: this.props.guide,
            workouts: this.props.workouts,
            dispatch: this.props.dispatch
          }) : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    workouts: state.workouts,
    guide: state.guide,
    app: state.app
  }
}

export default connect(mapStateToProps)(App)