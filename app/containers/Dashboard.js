import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'

import InfoWidget from '../components/InfoWidget'
import UserFrom from '../components/UserForm'

import * as userActions from '../actions/user'

const stylesheet = require('../scss/containers/Dashboard')

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.saveHandler = (title, value) => {
      const updateObj = {}
      const user = this.props.user

      switch (title) {
        case 'overhead press':
          updateObj.maxes = { press: Number(value) }
          break
        case 'deadlift':
          updateObj.maxes = { deadlift: Number(value) }
          break
        case 'bench press':
          updateObj.maxes = { 'bench_press': Number(value) }
          break
        case 'squat':
          updateObj.maxes = { squat: Number(value) }
          break
        default:
          updateObj[title] = Number(value)
      }

      this.props.dispatch(userActions.fetchUpdate({ user: user.info, data: updateObj }))
    }
  }
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
              <InfoWidget saveAction={this.saveHandler} title="weight" unit="lb" value={`${user.info.weight || '--'}`}/>
              <InfoWidget title="body fat" unit="%" value="--" disabled/>
              <InfoWidget saveAction={this.saveHandler} title="overhead press" unit="lb" value={`${maxes.press || '--'}`}/>
              <InfoWidget saveAction={this.saveHandler} title="deadlift" unit="lb" value={`${maxes.deadlift || '--'}`}/>
              <InfoWidget saveAction={this.saveHandler} title="bench press" unit="lb" value={`${maxes.bench_press || '--'}`}/>
              <InfoWidget saveAction={this.saveHandler} title="squat" unit="lb" value={`${maxes.squat || '--'}`}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}