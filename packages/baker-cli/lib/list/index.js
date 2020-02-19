const { getOngoingTrials } = require("../adapters/inato-api");
const validateArgs = require("./validation");
const { formatHeader, formatBody } = require("./formating");

const list = rawArgs => {
  const validArgs = validateArgs(rawArgs);
  formatHeader(validArgs);
  getOngoingTrials(validArgs).then(response => {
    formatBody(response.data);
  });
};

module.exports = list;
