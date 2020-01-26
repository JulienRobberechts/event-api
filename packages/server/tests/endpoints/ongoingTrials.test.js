const app = require("../../app");
const request = require("supertest");
const debug = require("debug")("server:api:trials");
const { mockThirdPartyApi } = require("../mock/thirdParty");

const expectedOngoingTrialsForSanofi = require("../data/trials-ongoingFor-Sanofi.json");
const expectedOngoingTrialsForAstraZeneca = require("../data/trials-ongoingFor-AstraZeneca.json");

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
