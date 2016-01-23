import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch/fetch-npm-node';
import nock from 'nock'

import { mockLocalStorage } from '../utils'

import * as userActions from '../../actions/user'
import user from '../../models/user'

polyfill();

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const API_URL = 'https://tsuyoku-api.herokuapp.com/'