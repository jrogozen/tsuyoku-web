import React from 'react'
import _ from 'lodash'

import * as workoutActions from '../actions/workout'

import HistoryList from '../components/HistoryList'
import Loader from '../components/Loader'

export default class WorkoutsView extends React.Component {
  componentWillMount() {
    const { dispatch, user, guide, workouts } = this.props
    const options = {
      user,
      routineName: '5/3/1'
    }

    dispatch(workoutActions.fetchWorkouts(options))
  }

  monthDict(num) {
    const dict = ['january', 'february', 'march', 'april', 'may',
      'june', 'july', 'august', 'september', 'october', 'november', 'december']

    return dict[num]
  }

  render() {
    const { dispatch, user, workouts } = this.props
    const sortedWorkouts = _.sortBy(workouts.data, (workout) => -workout.created_at)
    let workoutHistory = {}

    // todo: support years
    sortedWorkouts.forEach((workout) => {
      const month = new Date(workout.created_at).getMonth()

      if (!workoutHistory[month]) {
        workoutHistory[month] = {
          workouts: [],
          totalWorkouts: 0,
          totalLb: 0,
          month: this.monthDict(month)
        }
      }

      workoutHistory[month].totalWorkouts += 1
      workoutHistory[month].workouts.push(workout)

      workoutHistory[month].totalLb += workout.lifts.reduce((prev, current, i, arr) => {
        return prev + arr[i].weight.reduce((p, c) => {
          return p + c
        }, 0)
      }, 0)

      // todo: add % change from previous month
    })

    return (
      <div className="workouts-view-component">
        {/*workouts.isWaiting || _.size(sortedWorkouts) < 1 ?
          <Loader /> : null
        */}
        <HistoryList user={user} workoutHistory={workoutHistory} />
      </div>
    )
  }
}