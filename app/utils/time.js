import moment from 'moment'

export const getDate = function getDate() {
  return moment().format('MMM D, YYYY')
}