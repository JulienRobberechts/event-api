const moment = require('moment');
const debug = require("debug")("server:api:trials");

const {
  trialIsOngoingFilter,
  trialIsNotCanceled,
  trialIsSponsoredBy,
  trialIsInCountry,
  trialToSummary
} = require('../domains/trials/trials-filters');

class TrialsController {
  constructor({ apiAdapter }) {
    if (!apiAdapter)
      throw Error('apiAdapter is null');

    this.apiAdapter = apiAdapter;
  }

  async getTrials({ ongoing = null, sponsorName, countryCode }) {
    debug(
      `trials-controller.getTrials called with: ongoing=${ongoing} sponsorName=${sponsorName} countryCode=${countryCode}`
    );
    const allTrials = await this.apiAdapter.GetAllTrials();
    const currentDate = moment.utc();

    const trials = allTrials
      .filter(filterOnGoing(ongoing, currentDate))
      .filter(trialIsNotCanceled)
      .filter(trialIsSponsoredBy(sponsorName))
      .filter(trialIsInCountry(countryCode))
      .map(trialToSummary);

    return trials;
  }
}

const filterOnGoing = (ongoing, currentDate) => {
  if (ongoing === null)
    return () => true;
  return trialIsOngoingFilter(ongoing, currentDate);
}

module.exports = TrialsController;
