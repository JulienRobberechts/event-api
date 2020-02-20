const moment = require('moment');
const debug = require("debug")("server:api:events");

const eventIsOngoingFilter = (ongoing, currentDate) => {
  checkCurrentDate(currentDate);
  return ongoing
    ? event => eventIsOngoingAt(currentDate, event)
    : event => eventIsNotOngoingAt(currentDate, event);
}

const checkCurrentDate = currentDate => {
  if (!currentDate || typeof currentDate.isValid !== 'function')
    throw Error('currentDate should be a moment object');

  if (!currentDate.isValid())
    throw Error('currentDate is not a valid moment object');

  return currentDate;
}

const eventIsOngoingAt = (currentDate, event) =>
  currentDate.isBetween(
    moment.utc(event.start_date, 'YYYY-MM-DD'),
    moment.utc(event.end_date, 'YYYY-MM-DD'),
    null,
    '[]'
  );

const eventIsNotOngoingAt = (currentDate, event) =>
  !currentDate.isBetween(
    moment.utc(event.start_date, 'YYYY-MM-DD'),
    moment.utc(event.end_date, 'YYYY-MM-DD'),
    null,
    '[]'
  );

const eventIsType = type => event =>
  !type || event.type.toUpperCase() === type.toUpperCase();

const eventIsInCountry = countryCode => event =>
  !countryCode || event.country.toUpperCase() === countryCode.toUpperCase();

const eventToSummary = ({ name, start_date, end_date, type }) => ({
  name,
  start_date,
  end_date,
  type
});

module.exports = {
  eventIsOngoingFilter,
  eventIsType,
  eventIsInCountry,
  eventToSummary,
};
