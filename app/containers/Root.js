import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import DevTools from './DevTools'

const stylesheet = require('../scss/containers/Root.scss')

let isDev

if (__DEV__) {
  isDev = 'production' !== process.env.NODE_ENV
}

export default class Root extends React.Component {
  render() {
    const { store, history, routes } = this.props

    return (
      <Provider store={store}>
        <div>
          {isDev ? <DevTools /> : null}
          <Router history={history} children={routes} />
        </div>
      </Provider>
    )
  }
}

Root.PropTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired
}