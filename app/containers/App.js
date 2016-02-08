import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Header from '../components/Header'
import Loader from '../components/Loader'
import PopupModal from '../components/PopupModal'

import * as userActions from '../actions/user'
import * as appActions from '../actions/app'

import fetch from '../utils/fetch'
import setTimer from '../utils/timer'

const stylesheet = require('../scss/containers/App')

class App extends React.Component {
  constructor(props) {
    super(props)

    this.closeSuccessPopup = () => {
      const dispatch = this.props.dispatch

      dispatch(appActions.setAppBool('successPopup', false))
    }
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

  getCss() {
    return classnames({
      'out-of-focus': this.props.app.successPopup
    })
  }

  render() {
    return (
      <div className="app-container">
        <PopupModal isVisible={this.props.app.successPopup} id="workout-success">
          <p>Swole! You've completed a workout cycle! Should we update your one rep maxes?</p>
          <div>
            <button className="success">Yea!</button>
            <span className="skip" onClick={this.closeSuccessPopup}>skip for now</span>
          </div>
        </PopupModal>
        <div className={this.getCss()}>
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