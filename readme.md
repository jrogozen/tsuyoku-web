# Tsuyoku Web #
[![Build Status](https://travis-ci.org/jrogozen/tsuyoku-web.svg?branch=master)](https://travis-ci.org/jrogozen/tsuyoku-web)

## Auth ##
- keep api_access_token in localStorage
- keep api_refresh_token in app state
- attach api_access_token to all api requests
- if status 402 returned, make a login request with possible api_refresh_token, or redirect to login

### Demo ###
testy@gmail.com // 123456

### Todo ###
- server side rendering
- more robust api fetcing test suite
- test components
- fix mobile chrome (react-router/history upgrade?)
- add propTypes / defaultProps
- add linter (js/scss)