const {
  trialIsNotCanceled
} = require('./trials-filters');

describe('trialIsNotCanceled', () => {
  it('should identify not canceled trial', () => {
    const notCancelTrial = {
      "name": "item 1",
      "canceled": false
    };
    const result = trialIsNotCanceled(notCancelTrial);
    expect(result).toEqual(true);
  })
  it('should identify not canceled trial', () => {
    const notCancelTrial = {
      "name": "item 1"
    };
    const result = trialIsNotCanceled(notCancelTrial);
    expect(result).toEqual(true);
  })
  it('should identify canceled trial', () => {

    const notCancelTrial = {
      "name": "item 1",
      "canceled": true
    };
    const result = trialIsNotCanceled(notCancelTrial);
    expect(result).toEqual(false);
  })
})