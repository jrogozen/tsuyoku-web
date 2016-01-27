export const capitalize = function capitalize(string) {
  const split = string.split(' ')
  const capitalized = split.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  return capitalized.join(' ')
}