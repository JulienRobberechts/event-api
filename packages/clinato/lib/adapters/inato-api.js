const axios = require("axios");
const apiRoot = "http://localhost:3033";

const getOngoingTrials = ({ country }, formatTrialsList) => {
  return axios
    .get(
      country
        ? `${apiRoot}/OngoingTrials?country=${country}`
        : `${apiRoot}/OngoingTrials`
    )
    .catch(function(error) {
      console.log("Error: ", error);
    });
};

module.exports = { getOngoingTrials };
