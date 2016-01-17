import { expect } from 'chai'
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch/fetch-npm-node';
import nock from 'nock'

import _fetch from '../../utils/fetch';

const API_URL = 'https://tsuyoku-web.herokuapp.com/'

describe('Fetch util', () => {
  const util = _fetch

  afterEach(() => {
    nock.cleanAll()
  })

  it('should make api calls with the correct method', (done) => {
    const method = 'post'

    nock(API_URL)
      .post('/login')
      .reply(200, { success: true })

    util('post', 'login')
      .then((res) => {
        console.log(res)
        done()
      })
  })
})