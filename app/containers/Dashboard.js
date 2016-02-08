import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'

import InfoWidget from '../components/InfoWidget'
import UserFrom from '../components/UserForm'

import * as userActions from '../actions/user'

const stylesheet = require('../scss/containers/Dashboard')

export default class Dashboard extends React.Component {
  render() {
    const { user, dispatch } = this.props
    const maxes = user.info.maxes

    return (
      <div className="dashboard-container">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="dashboard-title">Dashboard</h2>
            </div>
            <div className="col-xs-12">
              <InfoWidget title="weight" value={`${user.info.weight || '--'} lb`}/>
              <InfoWidget title="body fat" value="-- %" disabled/>
              <InfoWidget title="overhead press" value={`${maxes.press || '--'} lb`}/>
              <InfoWidget title="deadlift" value={`${maxes.deadlift || '--'} lb`}/>
              <InfoWidget title="bench press" value={`${maxes.bench_press || '--'} lb`}/>
              <InfoWidget title="squat" value={`${maxes.squat || '--'} lb`}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}