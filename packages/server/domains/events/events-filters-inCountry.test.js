const {
  eventIsInCountry
} = require('./events-filters');

const eventFromItaly = {
  "name": "item 1",
  "country": "ITA"
};

describe('eventIsInCountry', () => {
  it('should identify event from a country', () => {
    const result = eventIsInCountry("ITA")(eventFromItaly);
    expect(result).toEqual(true);
  })
  it('should identify event not from a country', () => {
    const result = eventIsInCountry("FRA")(eventFromItaly);
    expect(result).toEqual(false);
  })
  it('should return all events when there is no country filter', () => {
    const result = eventIsInCountry(undefined)(eventFromItaly);
    expect(result).toEqual(true);
  })
})