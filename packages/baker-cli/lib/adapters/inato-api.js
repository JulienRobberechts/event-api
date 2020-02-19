const axios = require("axios");
const apiRoot = "http://localhost:3033";
var debug = require("debug")("cli:api");

const getOngoingTrials = ({ country }, formatTrialsList) => {
  const query = country
    ? `${apiRoot}/trials?ongoing=true&country=${country}`
    : `${apiRoot}/trials?ongoing=true`;
  debug("query:", query);
  return axios.get(query).catch(function (error) {
    console.log("Error: ", error);
  });
};

module.exports = { getOngoingTrials };
