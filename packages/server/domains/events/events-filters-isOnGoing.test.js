const moment = require('moment');

const {
  eventIsOngoingFilter
} = require('./events-filters');

const currentDate = moment.utc("2020-01-25");

describe('eventIsOngoingFilter', () => {
  it('should identify past item', () => {
    const pastEvent = {
      "name": "item 1",
      "start_date": "2011-06-22",
      "end_date": "2015-06-22"
    };
    const result = eventIsOngoingFilter(true, currentDate)(pastEvent);
    expect(result).toEqual(false);
  })
  it('should identify ongoing item (middle)', () => {
    const currentEvent = {
      "name": "item 2",
      "start_date": "2019-08-01",
      "end_date": "2020-08-01"
    };
    const result = eventIsOngoingFilter(true, currentDate)(currentEvent);
    expect(result).toEqual(true);
  })
  it('should identify ongoing item (upper limit)', () => {
    const currentEvent = {
      "name": "item 2",
      "start_date": "2015-01-01",
      "end_date": "2020-01-25"
    };
    const result = eventIsOngoingFilter(true, currentDate)(currentEvent);
    expect(result).toEqual(true);
  })
  it('should identify ongoing item (lower limit)', () => {
    const currentEvent = {
      "name": "item 2",
      "start_date": "2020-01-25",
      "end_date": "2020-03-15"
    };
    const result = eventIsOngoingFilter(true, currentDate)(currentEvent);
    expect(result).toEqual(true);
  })
  it('should identify future item', () => {
    const futureEvent = {
      "name": "item 3",
      "start_date": "2022-03-30",
      "end_date": "2028-08-15"
    };
    const result = eventIsOngoingFilter(true, currentDate)(futureEvent);
    expect(result).toEqual(false);
  })
  it('should return all when the current date is null', () => {
    const nullDate = null;
    const badCurrentDate = () => { eventIsOngoingFilter(true, nullDate) };
    expect(badCurrentDate).toThrow();
  })
  it('should throw an error on non moment date', () => {
    const stdDate = Date.now();
    const badCurrentDate = () => { eventIsOngoingFilter(true, stdDate) };
    expect(badCurrentDate).toThrow();
  })
  it('should throw an error on invalid date', () => {
    const invalidDate = moment.utc([2020, 15, 15]);
    const badCurrentDate = () => { eventIsOngoingFilter(true, invalidDate) };
    expect(badCurrentDate).toThrow();
  })
})

describe('eventIsOngoingFilter NEG', () => {
  it('should identify past item', () => {
    const pastEvent = {
      "name": "item 1",
      "start_date": "2011-06-22",
      "end_date": "2015-06-22"
    };
    const result = eventIsOngoingFilter(false, currentDate)(pastEvent);
    expect(result).toEqual(true);
  })
  it('should identify ongoing item (middle)', () => {
    const currentEvent = {
      "name": "item 2",
      "start_date": "2019-08-01",
      "end_date": "2020-08-01"
    };
    const result = eventIsOngoingFilter(false, currentDate)(currentEvent);
    expect(result).toEqual(false);
  })
  it('should identify ongoing item (upper limit)', () => {
    const currentEvent = {
      "name": "item 2",
      "start_date": "2015-01-01",
      "end_date": "2020-01-25"
    };
    const result = eventIsOngoingFilter(false, currentDate)(currentEvent);
    expect(result).toEqual(false);
  })
  it('should identify ongoing item (lower limit)', () => {
    const currentEvent = {
      "name": "item 2",
      "start_date": "2020-01-25",
      "end_date": "2020-03-15"
    };
    const result = eventIsOngoingFilter(false, currentDate)(currentEvent);
    expect(result).toEqual(false);
  })
  it('should identify future item', () => {
    const futureEvent = {
      "name": "item 3",
      "start_date": "2022-03-30",
      "end_date": "2028-08-15"
    };
    const result = eventIsOngoingFilter(false, currentDate)(futureEvent);
    expect(result).toEqual(true);
  })
  it('should return all when the current date is null', () => {
    const nullDate = null;
    const badCurrentDate = () => { eventIsOngoingFilter(false, nullDate) };
    expect(badCurrentDate).toThrow();
  })
  it('should throw an error on non moment date', () => {
    const stdDate = Date.now();
    const badCurrentDate = () => { eventIsOngoingFilter(false, stdDate) };
    expect(badCurrentDate).toThrow();
  })
  it('should throw an error on invalid date', () => {
    const invalidDate = moment.utc([2020, 15, 15]);
    const badCurrentDate = () => { eventIsOngoingFilter(false, invalidDate) };
    expect(badCurrentDate).toThrow();
  })
})