const debug = require("debug")("server:api:trials");

const trialIsOngoingAt = currentDate => trial =>
  new Date(trial.start_date) < currentDate &&
  new Date(trial.end_date) > currentDate;

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
