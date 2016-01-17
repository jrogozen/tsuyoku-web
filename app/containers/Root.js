import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import DevTools from './DevTools'
import routes from '../routes.js'

const isDev = 'production' !== process.env.NODE_ENV

export default class Root extends React.Component {
  render() {
    let { store, history } = this.props

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