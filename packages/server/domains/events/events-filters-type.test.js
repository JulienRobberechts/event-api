const {
  eventIsType
} = require('./events-filters');

const musicEvent = {
  "name": "item 1",
  "type": "music"
};

describe('eventIsType', () => {
  it('should identify event of a specific type', () => {
    const result = eventIsType("music")(musicEvent);
    expect(result).toEqual(true);
  })
  it('should identify event not of a specific type', () => {
    const result = eventIsType("experiment")(musicEvent);
    expect(result).toEqual(false);
  })
  it('should return all events when there is no type filter', () => {
    const result = eventIsType(undefined)(musicEvent);
    expect(result).toEqual(true);
  })
})