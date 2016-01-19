import React from 'react'
import { render } from 'react-dom'
import { syncHistory } from 'redux-simple-router'
import { createHistory } from 'history'

import Root from './containers/Root'
import configureStore from './store/configureStore'

const history = createHistory();
const store = configureStore(history);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
