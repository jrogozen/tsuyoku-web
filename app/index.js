console.log('hello');

import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

// import configureStore from './store/configureStore';

const history = createBrowserHistory();
// const store = configureStore();

class Temp extends React.Component {
  render() {
    return <h1>Hey!</h1>
  }
} 


ReactDOM.render(
  <Temp />,
  document.getElementById('root')
);