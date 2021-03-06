import React from 'react'

import { Link } from 'react-router'

export default class Home extends React.Component {
  render() {
    return (
      <div id="home-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p>
                Click the logo to go to the home page.
              </p>
              <p>
                Click to the face to go to the <Link to="/dashboard">dashboard</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}