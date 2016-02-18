import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'

import InfoWidget from '../components/InfoWidget'
import MaxWidget from '../components/MaxWidget'
import UserFrom from '../components/UserForm'
import EmailAndAgeEditor from '../components/EmailAndAgeEditor'

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

      return this.props.dispatch(userActions.fetchUpdate({ user: user.info, data: updateObj }))
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
              <EmailAndAgeEditor email={user.info.email} age={user.info.age} dispatch={dispatch} />
            </div>
            <div className="col-xs-12">
              <div className="dashboard-user-info">
                <InfoWidget saveAction={this.saveHandler} title="weight" unit="lb" value={`${user.info.weight || '--'}`}/>
                <InfoWidget title="body fat" unit="%" value="--" disabled/>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="dashboard-maxes">
                <h4>Base Weight (1RM)</h4>
                <MaxWidget
                  currentMax={maxes.press}
                  liftName="overhead press"
                  saveAction={this.saveHandler}
                />
                <MaxWidget
                  currentMax={maxes.deadlift}
                  liftName="deadlift"
                  saveAction={this.saveHandler}
                />
                <MaxWidget
                  currentMax={maxes.bench_press}
                  liftName="bench press"
                  saveAction={this.saveHandler}
                />
                <MaxWidget
                  currentMax={maxes.squat}
                  liftName="squat"
                  saveAction={this.saveHandler}
                />
              </div>
            </div>
            <div className="col-xs-12">
              <div className="dashboard-user-account-info">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}