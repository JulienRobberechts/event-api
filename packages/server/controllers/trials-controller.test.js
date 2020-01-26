// intercept the adapter with jest
jest.mock("../adapters/thirdPartyApi", () => ({
  GetAllTrials: jest.fn()
}));

// component under test
const {
  getOngoingTrialsBySponsor
} = require("../controllers/trials-controller");

// import the stub reference as you would do with the original dependency.
const thirdPartyApiAdapterStub = require("../adapters/thirdPartyApi");

const expectedOngoingTrialsForSanofi = require("../tests/data/trials-ongoingFor-Sanofi.json");
const expectedOngoingTrialsForAstraZeneca = require("../tests/data/trials-ongoingFor-AstraZeneca.json");

const allTrials = require("../tests/data/trials-all.json");

describe("trials controller and adapter", () => {
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());
  it("should return ongoing trials for Sanofi", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getOngoingTrialsBySponsor("Sanofi");
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toEqual(expectedOngoingTrialsForSanofi);
  });
  it("should return ongoing trials for AstraZeneca", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getOngoingTrialsBySponsor("AstraZeneca");
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toEqual(expectedOngoingTrialsForAstraZeneca);
  });
  it("should return no ongoing trials for unknown lab", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getOngoingTrialsBySponsor("UnknownLab");
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});

module.exports = { getOngoingTrialsBySponsor };
