var debug = require("debug")("server:api:trials");

async function getOngoingTrialsBySponsor(sponsorName) {
  debug(
    `trials-controller.getOngoingTrialsBySponsor called with: sponsorName=${sponsorName}`
  );
  return { message: "Dummy Data" };
}

module.exports = { getOngoingTrialsBySponsor };
