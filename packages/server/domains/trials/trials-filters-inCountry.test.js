const moment = require('moment');

const {
  trialIsInCountry
} = require('./trials-filters');

const trialFromItaly = {
  "name": "item 1",
  "country": "IT"
};

describe('trialIsInCountry', () => {
  it('should identify trial from a country', () => {
    const result = trialIsInCountry("IT")(trialFromItaly);
    expect(result).toEqual(true);
  })
  it('should identify trial sponsored not  from a country', () => {
    const result = trialIsInCountry("FR")(trialFromItaly);
    expect(result).toEqual(false);
  })
})