import { expect } from 'chai'
import * as utils from '../../utils/weight'

describe('Weight utils', () => {

  // Brzycki formula
  it('should return correct one rep maxes', () => {
    const util = utils.getOneRepMax

    expect(util(1, 225)).to.eq(225)
    expect(util(3, 135)).to.eq(143)
    expect(util(10, 285)).to.eq(380)
    expect(util(11, 200)).to.eq(false)
  })
})