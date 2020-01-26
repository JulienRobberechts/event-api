const nock = require("nock");
const allTrials = require("../data/trials-all.json");
const ThirdPartyApiRootUrl = "https://api.trials.thirdparty.com";

const mockThirdPartyApi = () => {
  nock(ThirdPartyApiRootUrl)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/alltrials")
    .reply(200, allTrials);
};

module.exports = { mockThirdPartyApi };
