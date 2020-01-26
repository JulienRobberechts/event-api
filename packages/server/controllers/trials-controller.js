const debug = require("debug")("server:api:trials");
const { GetAllTrials } = require("../adapters/thirdPartyApi");

async function getOngoingTrialsBySponsor({ sponsorName }) {
  debug(
    `trials-controller.getOngoingTrialsBySponsor called with: sponsorName=${sponsorName}`
  );
  const allTrials = await GetAllTrials();
  const currentDate = Date.now();

  const ongoingTrials = allTrials
    .filter(trialIsOngoingAt(currentDate))
    .filter(trialIsNotCanceled)
    .filter(trialIsSponsoredBy(sponsorName))
    .map(trialSummary);

  return ongoingTrials;
}

const trialIsOngoingAt = currentDate => trial =>
  new Date(trial.start_date) < currentDate &&
  new Date(trial.end_date) > currentDate;

const trialIsNotCanceled = trial => !trial.canceled;

const trialIsSponsoredBy = sponsorName => trial =>
  !sponsorName || trial.sponsor.toUpperCase() === sponsorName.toUpperCase();

const trialSummary = ({ name, start_date, end_date, sponsor }) => ({
  name,
  start_date,
  end_date,
  sponsor
});

module.exports = { getOngoingTrialsBySponsor };
