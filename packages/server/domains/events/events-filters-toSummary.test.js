const {
  eventToSummary
} = require('./events-filters');

const event = {
  "name": "Burning Man",
  "link": "https://burningman.org/event/preparation/faq/",
  "country": "USA",
  "city": "Black Rock Desert, Nevada",
  "start_date": "2020-08-30",
  "end_date": "2025-09-07",
  "type": "Experience"
};

describe('eventToSummary', () => {
  it('should transform a event into summary', () => {
    const result = eventToSummary(event);
    const expectedSummary = {
      "name": "Burning Man",
      "start_date": "2020-08-30",
      "end_date": "2025-09-07",
      "type": "Experience"
    };
    expect(result).toEqual(expectedSummary);
  });
})