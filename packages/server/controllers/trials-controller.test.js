const debug = require("debug")("server:api:trials");
const { mockThirdPartyApi } = require("../tests/mock/thirdParty");
const {
  getOngoingTrialsBySponsor
} = require("../controllers/trials-controller");

const expectedOngoingTrialsForSanofi = require("../tests/data/trials-ongoingFor-Sanofi.json");
const expectedOngoingTrialsForAstraZeneca = require("../tests/data/trials-ongoingFor-AstraZeneca.json");

describe("trials controller and adapter", () => {
  beforeEach(() => {
    mockThirdPartyApi();
  });
  it("should return ongoing trials for Sanofi", async () => {
    const result = await getOngoingTrialsBySponsor("Sanofi");
    expect(result).toEqual(expectedOngoingTrialsForSanofi);
  });
  it("should return ongoing trials for AstraZeneca", async () => {
    const result = await getOngoingTrialsBySponsor("AstraZeneca");
    expect(result).toEqual(expectedOngoingTrialsForAstraZeneca);
  });
  it("should return no ongoing trials for unknown lab", async () => {
    const result = await getOngoingTrialsBySponsor("UnknownLab");
    expect(result).toEqual([]);
  });
});

module.exports = { getOngoingTrialsBySponsor };
