export const getOneRepMax = function getOneRepMax (reps, weight) {
  if (reps > 10) {
    return false
  }

  return Math.ceil(weight * (36 / (37 - reps)))
}