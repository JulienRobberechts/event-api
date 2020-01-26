const axios = require("axios");
var debug = require("debug")("server:api:trials");

const ThirdPartyApiRootUrl = "https://api.trials.thirdparty.com";

const GetAllTrials = async () => {
  try {
    const response = await axios.get(ThirdPartyApiRootUrl + "/alltrials");
    // debug("thirdPartyApi Adapter response:", JSON.stringify(response));
    return response.data;
  } catch (error) {
    debug("thirdPartyApi Adapter error:", error);
    return [];
  }
};

module.exports = { GetAllTrials };
