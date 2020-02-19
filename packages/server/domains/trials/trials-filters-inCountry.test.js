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
  it('should identify trial not from a country', () => {
    const result = trialIsInCountry("FR")(trialFromItaly);
    expect(result).toEqual(false);
  })
  it('should return all trials when there is no country filter', () => {
    const result = trialIsInCountry(undefined)(trialFromItaly);
    expect(result).toEqual(true);
  })
})