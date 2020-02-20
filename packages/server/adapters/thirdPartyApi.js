const axios = require("axios");
const config = require("../config/config");
var debug = require("debug")("server:api:events");
const { ConnectivityError } = require("../utils/errors/ConnectivityError");

const GetAllEvents = async () => {
  try {
    const response = await axios.get(
      config.ThirdPartyApiRootUrl + "/allevents"
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

module.exports = { GetAllEvents };
