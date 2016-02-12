export const base = {
  _id: null,
  email: null,
  age: null,
  weight: null,
  admin: null,
  paid: null,
  api_refresh_token: null,
  api_access_token: null,
  maxes: {
    bench_press: null,
    deadlift: null,
    press: null,
    squat: null,
  },
  created_at: null
}

export default function(json) {
  const { data, api_access_token } = json
  const mergedUser = Object.assign(
      Object.create(base),
      data
  )
  mergedUser.api_access_token = api_access_token || mergedUser.api_access_token
  return mergedUser
}