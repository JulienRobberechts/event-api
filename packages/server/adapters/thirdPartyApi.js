const axios = require("axios");
const config = require("../config/config");
var debug = require("debug")("server:api:trials");

const GetAllTrials = async () => {
  try {
    const response = await axios.get(
      config.ThirdPartyApiRootUrl + "/alltrials"
    );
    // debug("thirdPartyApi Adapter response:", JSON.stringify(response));
    return response.data;
  } catch (error) {
    debug("thirdPartyApi Adapter error:", error);
    return [];
  }
};

module.exports = { GetAllTrials };
