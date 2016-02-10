import { polyfill } from 'es6-promise';

import {
  expect,
  fetch,
  nock,
  mockLocalStorage,
  API_URL
} from '../utils'

import _fetch from '../../utils/fetch';

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