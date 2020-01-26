const request = require("supertest");

const app = require("../app");
const { mockThirdPartyApi } = require("../tests/mock/thirdParty");
const expectedOngoingTrialsForSanofi = require("../tests/data/trials-ongoingFor-Sanofi.json");
const expectedOngoingTrialsForAstraZeneca = require("../tests/data/trials-ongoingFor-AstraZeneca.json");

const api = request(app);

describe("GET /OngoingTrials", () => {
  beforeEach(() => {
    mockThirdPartyApi();
  });
  it("/Sanofi", async () => {
    const response = await api.get("/OngoingTrials/Sanofi").expect(200);
    expect(response.body).toEqual(expectedOngoingTrialsForSanofi);
  });
  it("/AstraZeneca", async () => {
    const response = await api.get("/OngoingTrials/AstraZeneca").expect(200);
    expect(response.body).toEqual(expectedOngoingTrialsForAstraZeneca);
  });
  it("/UnknownLab", async () => {
    const response = await api.get("/OngoingTrials/UnknownLab").expect(200);
    expect(response.body).toEqual([]);
  });
});
