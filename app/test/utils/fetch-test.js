import { expect } from 'chai'
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch/fetch-npm-node';
import nock from 'nock'

import { mockLocalStorage } from '../utils'

import _fetch from '../../utils/fetch';

const API_URL = 'https://tsuyoku-api.herokuapp.com/'

describe('Fetch util', () => {
  const util = _fetch

  before(() => {
    mockLocalStorage()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('make api calls with the correct method', (done) => {
    const method = 'post'

    nock(API_URL)
      .post('/login')
      .reply(200, { success: true })

    util(null, null, {
      method: method,
      endpoint: 'login'
    })
      .then((res) => {
        expect(res.success).to.eq(true)
        done()
      })
  })
  
  // todo: add test for auth 2nd try
})