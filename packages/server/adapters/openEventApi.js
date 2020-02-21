const axios = require("axios");
const config = require("../config/config");
var debug = require("debug")("server:api:events");
const { ConnectivityError } = require("../utils/errors/ConnectivityError");

const GetAllEvents = async () => {
  try {
    const response = await axios.get(
      config.OpenEventApiRootUrl + "/allevents"
    );
    // debug("OpenEventApi Adapter response:", JSON.stringify(response));
    return response.data;
  } catch (error) {
    throw new ConnectivityError(
      "Connectivity Error with the OpenEvent Api",
      error
    );
  }
};

module.exports = { GetAllEvents };
