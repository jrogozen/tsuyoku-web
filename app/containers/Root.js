import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import DevTools from './DevTools'

let isDev

if (__DEV__) {
  isDev = 'production' !== process.env.NODE_ENV
}

export default class Root extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log("RECEIVING PROPS", nextProps, this.props)
  }

  render() {
    console.log('ROOT IS RENDERING');
    const { store, history, routes } = this.props
    // const routes = configRoutes(store)

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
  // routes
}