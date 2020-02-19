const {
  trialToSummary
} = require('./trials-filters');

const trial = {
  "name": "Supine MRI in Breast Cancer Patients Receiving Neoadjuvant Therapy",
  "country": "IT",
  "start_date": "2022-06-15",
  "end_date": "2030-12-24",
  "sponsor": "AstraZeneca",
  "canceled": false,
  "study_type": "interventional",
  "primary_purpose": "treatment"
};

describe('trialToSummary', () => {
  it('should transform a trial into summary', () => {
    const result = trialToSummary(trial);
    const expectedSummary = {
      "name": "Supine MRI in Breast Cancer Patients Receiving Neoadjuvant Therapy",
      "start_date": "2022-06-15",
      "end_date": "2030-12-24",
      "sponsor": "AstraZeneca"
    };
    expect(result).toEqual(expectedSummary);
  });
})