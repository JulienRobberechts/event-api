const nock = require("nock");
const allTrials = require("../data/trials-all.json");
const config = require("../../config/config");

const mockThirdPartyApi = () => {
  nock(config.ThirdPartyApiRootUrl)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/alltrials")
    .reply(200, allTrials);
};

module.exports = { mockThirdPartyApi };
