const debug = require("debug")("server:api:trials");
const { GetAllTrials } = require("../adapters/thirdPartyApi");
const SampleAllTrials = require("../tests/data/trials-all.json");

async function getOngoingTrialsBySponsor(sponsorName) {
  debug(
    `trials-controller.getOngoingTrialsBySponsor called with: sponsorName=${sponsorName}`
  );

  debug("process.env.SAMPLE_MODE =", process.env.SAMPLE_MODE);
  const allTrials = process.env.SAMPLE_MODE
    ? SampleAllTrials
    : await GetAllTrials();
  const currentDate = Date.now();

  // debug("allTrials", allTrials);

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

const trialIsSponsoredBy = sponsorName => trial => trial.sponsor == sponsorName;

const trialSummary = ({ name, start_date, end_date, sponsor }) => ({
  name,
  start_date,
  end_date,
  sponsor
});

module.exports = { getOngoingTrialsBySponsor };
