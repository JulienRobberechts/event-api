const request = require("supertest");

const app = require("../app");
const { mockThirdPartyApi } = require("../tests/mock/thirdParty");
const expectedOngoingTrialsForSanofi = require("../tests/data/trials-ongoingFor-Sanofi.json");
const expectedOngoingTrialsForAstraZeneca = require("../tests/data/trials-ongoingFor-AstraZeneca.json");
const expectedOngoingTrials = require("../tests/data/trials-ongoing.json");

const api = request(app);

describe("GET /OngoingTrials", () => {
  beforeEach(() => {
    mockThirdPartyApi();
  });
  it("all", async () => {
    const response = await api.get("/OngoingTrials").expect(200);
    expect(response.body).toEqual(expectedOngoingTrials);
  });
  it("sponsor Sanofi", async () => {
    const response = await api.get("/OngoingTrials?sponsor=Sanofi").expect(200);
    expect(response.body).toEqual(expectedOngoingTrialsForSanofi);
  });
  it("sponsor AstraZeneca", async () => {
    const response = await api
      .get("/OngoingTrials?sponsor=AstraZeneca")
      .expect(200);
    expect(response.body).toEqual(expectedOngoingTrialsForAstraZeneca);
  });
  it("sponsor UnknownLab", async () => {
    const response = await api
      .get("/OngoingTrials?sponsor=UnknownLab")
      .expect(200);
    expect(response.body).toEqual([]);
  });
});
