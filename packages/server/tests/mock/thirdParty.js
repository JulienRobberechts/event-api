const nock = require("nock");
const allEvents = require("./events-all.json");
const config = require("../../config/config");

const mockThirdPartyApi = () => {
  nock(config.ThirdPartyApiRootUrl)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/allevents")
    .reply(200, allEvents);
};

module.exports = { mockThirdPartyApi };
