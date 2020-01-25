const axios = require("axios");
var debug = require("debug")("server:api:trials");

const GetAllTrials = async () => {
  try {
    const response = await axios.get("http://localhost:4010/alltrials");
    debug("thirdPartyApi Adapter response:");
    return response.data;
  } catch (error) {
    debug("thirdPartyApi Adapter error:", error);
    return [];
  }
};

module.exports = { GetAllTrials };
