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
const expectedOngoingTrials = require("../tests/data/trials-ongoing.json");

const allTrials = require("../tests/data/trials-all.json");

describe("trials controller and adapter", () => {
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());
  it("should return all trials", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getOngoingTrialsBySponsor({});
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toEqual(expectedOngoingTrials);
  });
  it("should return trials for Sanofi", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getOngoingTrialsBySponsor({ sponsorName: "Sanofi" });
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toEqual(expectedOngoingTrialsForSanofi);
  });
  it("should return trials for AstraZeneca", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getOngoingTrialsBySponsor({
      sponsorName: "AstraZeneca"
    });
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toEqual(expectedOngoingTrialsForAstraZeneca);
  });
  it("should return no trials for unknown lab", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getOngoingTrialsBySponsor({
      sponsorName: "UnknownLab"
    });
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});

module.exports = { getOngoingTrialsBySponsor };
