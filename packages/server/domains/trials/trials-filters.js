const moment = require('moment');
const debug = require("debug")("server:api:trials");

const trialIsOngoingAt = currentDate => {
  if (!currentDate || typeof currentDate.isValid !== 'function')
    throw Error('currentDate should be a moment object');

  if (!currentDate.isValid())
    throw Error('currentDate is not a valid moment object');

  return trial =>
    currentDate.isBetween(
      moment.utc(trial.start_date, 'YYYY-MM-DD'),
      moment.utc(trial.end_date, 'YYYY-MM-DD'),
      null,
      '[]'
    );
}

const trialIsNotCanceled = trial => !trial.canceled;

const trialIsSponsoredBy = sponsorName => trial =>
  !sponsorName || trial.sponsor.toUpperCase() === sponsorName.toUpperCase();

const trialIsInCountry = countryCode => trial =>
  !countryCode || trial.country.toUpperCase() === countryCode.toUpperCase();

const trialToSummary = ({ name, start_date, end_date, sponsor }) => ({
  name,
  start_date,
  end_date,
  sponsor
});

module.exports = {
  trialIsOngoingAt,
  trialIsNotCanceled,
  trialIsSponsoredBy,
  trialIsInCountry,
  trialToSummary,
};
