const moment = require('moment');

const {
  trialIsSponsoredBy
} = require('./trials-filters');

const trialWithSponsorA = {
  "name": "item 1",
  "sponsor": "SPONSOR_A"
};

describe('trialIsSponsoredBy', () => {
  it('should identify trial sponsored by a sponsor', () => {
    const result = trialIsSponsoredBy("SPONSOR_A")(trialWithSponsorA);
    expect(result).toEqual(true);
  })
  it('should identify trial sponsored not by a sponsor', () => {
    const result = trialIsSponsoredBy("SPONSOR_B")(trialWithSponsorA);
    expect(result).toEqual(false);
  })
  it('should return all trials when there is no sponsor filter', () => {
    const result = trialIsSponsoredBy(undefined)(trialWithSponsorA);
    expect(result).toEqual(true);
  })
})