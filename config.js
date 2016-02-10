const isDev = JSON.stringify(process.env.NODE) === 'development'

export const API_URL = isDev ? 'http://localhost:1337/' : 'https://tsuyoku-api.herokuapp.com/'
