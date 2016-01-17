import React from 'react'
import Navigation from '../components/Navigation'

export default class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <h1>App</h1>
        <Navigation />
        {this.props.children}
      </div>
    )
  }
}