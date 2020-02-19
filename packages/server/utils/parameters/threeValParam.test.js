const { get3ValBooleanParam } = require('./threeValParam');

describe('get3ValBooleanParam', () => {
  it('should return false for false', () => {
    expect(get3ValBooleanParam('false')).toBe(false);
  })
  it('should return false for FALSE', () => {
    expect(get3ValBooleanParam('FALSE')).toBe(false);
  })
  it('should return true for true', () => {
    expect(get3ValBooleanParam('true')).toBe(true);
  })
  it('should return true for TRUE', () => {
    expect(get3ValBooleanParam('true')).toBe(true);
  })
  it('should return null for undefined', () => {
    expect(get3ValBooleanParam(undefined)).toBe(null);
  })
  it('should return null for  string', () => {
    expect(get3ValBooleanParam('undefined')).toBe(null);
  })
  it('should return null for null', () => {
    expect(get3ValBooleanParam(null)).toBe(null);
  })
  it('should return null for null string', () => {
    expect(get3ValBooleanParam('null')).toBe(null);
  })
  it('should return null for random string', () => {
    expect(get3ValBooleanParam('random')).toBe(null);
  })
})