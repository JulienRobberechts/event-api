const moment = require('moment');

const {
  trialIsSponsoredBy
} = require('./trials-filters');

describe('trialIsSponsoredBy', () => {
  it('should identify trial sponsored by a sponsor', () => {
    const trial = {
      "name": "item 1",
      "sponsor": "SPONSOR_A"
    };
    const result = trialIsSponsoredBy("SPONSOR_A")(trial);
    expect(result).toEqual(true);
  })
  it('should identify trial sponsored not by a sponsor', () => {
    const trial = {
      "name": "item 1",
      "sponsor": "SPONSOR_A"
    };
    const result = trialIsSponsoredBy("SPONSOR_B")(trial);
    expect(result).toEqual(false);
  })
})