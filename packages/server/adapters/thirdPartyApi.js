const axios = require("axios");
const config = require("../config/config");
var debug = require("debug")("server:api:trials");
const { ConnectivityError } = require("../utils/errors/ConnectivityError");

const SampleAllTrials = require("../tests/data/trials-all.json");

const GetAllTrials = async () => {
  debug("process.env.SAMPLE_MODE =", process.env.SAMPLE_MODE);
  if (process.env.SAMPLE_MODE) return SampleAllTrials;
  try {
    const response = await axios.get(
      config.ThirdPartyApiRootUrl + "/alltrials"
    );
    // debug("thirdPartyApi Adapter response:", JSON.stringify(response));
    return response.data;
  } catch (error) {
    // debug("thirdPartyApi Adapter error:", error);
    throw new ConnectivityError(
      "Connectivity Error with the Third Party Api",
      error
    );
  }
};

module.exports = { GetAllTrials };
