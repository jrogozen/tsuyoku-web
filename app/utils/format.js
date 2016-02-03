export const capitalize = function capitalize(string) {
  const split = string.toLowerCase().split(' ')
  const capitalized = split.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  return capitalized.join(' ')
}

export const secondsToTime = function secondsToTime(seconds) {
  let timeString = ''

  if (seconds <= 60) {
    timeString = `0:${seconds < 10 ? '0' + seconds : seconds}`
  } else {
    const minutes = Math.floor(seconds / 60)
    const leftover = seconds - (minutes * 60)
    timeString = `${minutes}:${leftover < 10 ? '0' + leftover : leftover}`
  }

  return timeString
}

export const dateToDay = function dateToDay(date) {
  const dict = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday']

  return dict[date.getDay()]
}