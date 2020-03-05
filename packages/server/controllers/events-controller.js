const moment = require("moment");
const debug = require("debug")("server:api:events");

const {
  eventIsOngoingFilter,
  eventIsType,
  eventIsInCountry,
  eventToSummary
} = require("../domains/events/events-filters");

class EventsController {
  constructor({ apiAdapter }) {
    if (!apiAdapter) throw Error("apiAdapter is null");

    this.apiAdapter = apiAdapter;
  }

  async getEvents({ ongoing = null, type, countryCode, date }) {
    debug(
      `events-controller.getEvents called with: ongoing=${ongoing} type=${type} countryCode=${countryCode}`
    );
    const allEvents = await this.apiAdapter.GetAllEvents();

    const dateInQuery = moment(date);
    const currentDate = dateInQuery.isValid() ? dateInQuery : moment.utc();

    const events = allEvents
      .filter(filterOnGoing(ongoing, currentDate))
      .filter(eventIsType(type))
      .filter(eventIsInCountry(countryCode))
      .map(eventToSummary);

    return events;
  }
}

const filterOnGoing = (ongoing, currentDate) => {
  if (ongoing === null) return () => true;
  return eventIsOngoingFilter(ongoing, currentDate);
};

module.exports = EventsController;
