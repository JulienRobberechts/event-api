const axios = require("axios");
var debug = require("debug")("server:api:trials");

const ThirdPartyApiRootUrl = "https://api.trials.thirdparty.com";
const ThirdPartyApiRootUrl_LOCAL = "http://localhost:4010/alltrials";

const GetAllTrials = async () => {
  try {
    const response = await axios.get(ThirdPartyApiRootUrl + "/alltrials");
    debug("thirdPartyApi Adapter response:");
    return response.data;
  } catch (error) {
    debug("thirdPartyApi Adapter error:", error);
    return [];
  }
};

module.exports = { GetAllTrials };
