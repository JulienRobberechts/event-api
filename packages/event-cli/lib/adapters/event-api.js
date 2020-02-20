const axios = require("axios");
const apiRoot = "http://localhost:3033";
var debug = require("debug")("cli:api");

const getEvents = ({ country }) => {
  const query = country
    ? `${apiRoot}/events?country=${country}`
    : `${apiRoot}/events`;
  debug("query:", query);
  return axios.get(query).catch(function (error) {
    console.log("Error: ", error);
  });
};

module.exports = { getEvents };
