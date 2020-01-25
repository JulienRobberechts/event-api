const debug = require("debug")("server:api:trials");
const { GetAllTrials } = require("../adapters/thirdPartyApi");

async function getOngoingTrialsBySponsor(sponsorName) {
  debug(
    `trials-controller.getOngoingTrialsBySponsor called with: sponsorName=${sponsorName}`
  );
  const allTrials = await GetAllTrials();
  return allTrials;
}

module.exports = { getOngoingTrialsBySponsor };
