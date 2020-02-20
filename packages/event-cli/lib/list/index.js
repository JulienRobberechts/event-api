const { getEvents } = require("../adapters/event-api");
const validateArgs = require("./validation");
const { formatHeader, formatBody } = require("./formating");
var debug = require("debug")("cli:list");

const list = rawArgs => {
  debug('rawArgs', rawArgs);
  const validArgs = validateArgs(rawArgs);
  formatHeader(validArgs);
  getEvents(validArgs).then(response => {
    formatBody(response.data);
  });
};

module.exports = list;
