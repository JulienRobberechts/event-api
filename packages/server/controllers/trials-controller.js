const moment = require('moment');
const debug = require("debug")("server:api:trials");
const { GetAllTrials } = require("../adapters/thirdPartyApi");
const {
  trialIsOngoingFilter,
  trialIsNotCanceled,
  trialIsSponsoredBy,
  trialIsInCountry,
  trialToSummary
} = require('../domains/trials/trials-filters');

async function getTrials({ ongoing = null, sponsorName, countryCode }) {
  debug(
    `trials-controller.getTrials called with: ongoing=${ongoing} sponsorName=${sponsorName} countryCode=${countryCode}`
  );
  const allTrials = await GetAllTrials();
  const currentDate = moment.utc();

  const trials = allTrials
    .filter(filterOnGoing(ongoing, currentDate))
    .filter(trialIsNotCanceled)
    .filter(trialIsSponsoredBy(sponsorName))
    .filter(trialIsInCountry(countryCode))
    .map(trialToSummary);

  return trials;
}

const filterOnGoing = (ongoing, currentDate) => {
  if (ongoing === null)
    return () => true;
  return trialIsOngoingFilter(ongoing, currentDate);
}

module.exports = { getTrials };
