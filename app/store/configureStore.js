import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import DevTools from '../containers/DevTools'
import { syncHistory } from 'react-router-redux'

let isDev

if (__DEV__) {
  isDev = 'production' !== process.env.NODE_ENV
}

export default function configureStore(history) {
  const router = syncHistory(history)
  const defaultMiddleware = [ createLogger(), thunk, router ]

  const finalCreateStore = isDev ?
    compose(
      applyMiddleware(...defaultMiddleware),
      DevTools.instrument()
    )(createStore) :
    compose(
      applyMiddleware(...defaultMiddleware)
    )(createStore)

  const store = finalCreateStore(rootReducer)

  router.listenForReplays(store)

  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     const nextReducer = require('../reducers')
  //     store.replaceReducer(nextReducer)
  //   })
  // }

  return store
}
