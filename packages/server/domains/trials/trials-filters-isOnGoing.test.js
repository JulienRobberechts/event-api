const moment = require('moment');

const {
  trialIsOngoingFilter
} = require('./trials-filters');

const currentDate = moment.utc("2020-01-25");

describe('trialIsOngoingFilter', () => {
  it('should identify past item', () => {
    const pastTrial = {
      "name": "item 1",
      "start_date": "2011-06-22",
      "end_date": "2015-06-22"
    };
    const result = trialIsOngoingFilter(true, currentDate)(pastTrial);
    expect(result).toEqual(false);
  })
  it('should identify ongoing item (middle)', () => {
    const currentTrial = {
      "name": "item 2",
      "start_date": "2019-08-01",
      "end_date": "2020-08-01"
    };
    const result = trialIsOngoingFilter(true, currentDate)(currentTrial);
    expect(result).toEqual(true);
  })
  it('should identify ongoing item (upper limit)', () => {
    const currentTrial = {
      "name": "item 2",
      "start_date": "2015-01-01",
      "end_date": "2020-01-25"
    };
    const result = trialIsOngoingFilter(true, currentDate)(currentTrial);
    expect(result).toEqual(true);
  })
  it('should identify ongoing item (lower limit)', () => {
    const currentTrial = {
      "name": "item 2",
      "start_date": "2020-01-25",
      "end_date": "2020-03-15"
    };
    const result = trialIsOngoingFilter(true, currentDate)(currentTrial);
    expect(result).toEqual(true);
  })
  it('should identify future item', () => {
    const futureTrial = {
      "name": "item 3",
      "start_date": "2022-03-30",
      "end_date": "2028-08-15"
    };
    const result = trialIsOngoingFilter(true, currentDate)(futureTrial);
    expect(result).toEqual(false);
  })
  it('should return all when the current date is null', () => {
    const nullDate = null;
    const badCurrentDate = () => { trialIsOngoingFilter(true, nullDate) };
    expect(badCurrentDate).toThrow();
  })
  it('should throw an error on non moment date', () => {
    const stdDate = Date.now();
    const badCurrentDate = () => { trialIsOngoingFilter(true, stdDate) };
    expect(badCurrentDate).toThrow();
  })
  it('should throw an error on invalid date', () => {
    const invalidDate = moment.utc([2020, 15, 15]);
    const badCurrentDate = () => { trialIsOngoingFilter(true, invalidDate) };
    expect(badCurrentDate).toThrow();
  })
})

describe('trialIsOngoingFilter NEG', () => {
  it('should identify past item', () => {
    const pastTrial = {
      "name": "item 1",
      "start_date": "2011-06-22",
      "end_date": "2015-06-22"
    };
    const result = trialIsOngoingFilter(false, currentDate)(pastTrial);
    expect(result).toEqual(true);
  })
  it('should identify ongoing item (middle)', () => {
    const currentTrial = {
      "name": "item 2",
      "start_date": "2019-08-01",
      "end_date": "2020-08-01"
    };
    const result = trialIsOngoingFilter(false, currentDate)(currentTrial);
    expect(result).toEqual(false);
  })
  it('should identify ongoing item (upper limit)', () => {
    const currentTrial = {
      "name": "item 2",
      "start_date": "2015-01-01",
      "end_date": "2020-01-25"
    };
    const result = trialIsOngoingFilter(false, currentDate)(currentTrial);
    expect(result).toEqual(false);
  })
  it('should identify ongoing item (lower limit)', () => {
    const currentTrial = {
      "name": "item 2",
      "start_date": "2020-01-25",
      "end_date": "2020-03-15"
    };
    const result = trialIsOngoingFilter(false, currentDate)(currentTrial);
    expect(result).toEqual(false);
  })
  it('should identify future item', () => {
    const futureTrial = {
      "name": "item 3",
      "start_date": "2022-03-30",
      "end_date": "2028-08-15"
    };
    const result = trialIsOngoingFilter(false, currentDate)(futureTrial);
    expect(result).toEqual(true);
  })
  it('should return all when the current date is null', () => {
    const nullDate = null;
    const badCurrentDate = () => { trialIsOngoingFilter(false, nullDate) };
    expect(badCurrentDate).toThrow();
  })
  it('should throw an error on non moment date', () => {
    const stdDate = Date.now();
    const badCurrentDate = () => { trialIsOngoingFilter(false, stdDate) };
    expect(badCurrentDate).toThrow();
  })
  it('should throw an error on invalid date', () => {
    const invalidDate = moment.utc([2020, 15, 15]);
    const badCurrentDate = () => { trialIsOngoingFilter(false, invalidDate) };
    expect(badCurrentDate).toThrow();
  })
})