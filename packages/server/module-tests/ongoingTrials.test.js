const app = require("../app");
const nock = require("nock");
const request = require("supertest");
const debug = require("debug")("server:api:trials");

// to move
const allTrials = require("../controllers/trials.test-data.json");

const expectedOngoingTrialsForSanofi = [
  {
    name: "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
    start_date: "2019-01-01",
    end_date: "2025-08-01",
    sponsor: "Sanofi"
  },
  {
    name: "Topical Calcipotriene Treatment for Breast Cancer Immunoprevention",
    start_date: "2018-03-20",
    end_date: "2022-09-10",
    sponsor: "Sanofi"
  }
];

const ThirdPartyApiRootUrl = "https://api.trials.thirdparty.com";

const mockThirdPartyApi = () => {
  nock(ThirdPartyApiRootUrl)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/alltrials")
    .reply(200, allTrials);
};

describe("GET /OngoingTrials", () => {
  beforeEach(() => {
    mockThirdPartyApi();
  });
  it("/Sanofi", async () => {
    const response = await request(app).get("/OngoingTrials/Sanofi");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedOngoingTrialsForSanofi);
  });
});
