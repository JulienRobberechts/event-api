// intercept the adapter with jest
jest.mock("../adapters/thirdPartyApi", () => ({
  GetAllTrials: jest.fn()
}));

// component under test
const {
  getTrials
} = require("../controllers/trials-controller");

// import the stub reference as you would do with the original dependency.
const thirdPartyApiAdapterStub = require("../adapters/thirdPartyApi");

const allTrials = require("../tests/data/trials-all.json");

describe("trials controller and adapter", () => {
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());
  it("should return all ongoing trials", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getTrials({});
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toMatchSnapshot();
  });
  it("should return ongoing trials for Sanofi", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getTrials({ sponsorName: "Sanofi" });
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toMatchSnapshot();
  });
  it("should return ongoing trials for AstraZeneca", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getTrials({
      sponsorName: "AstraZeneca"
    });
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toMatchSnapshot();
  });
  it("should return no trials for unknown lab", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getTrials({
      sponsorName: "UnknownLab"
    });
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
  it("should return ongoing trials in France", async () => {
    thirdPartyApiAdapterStub.GetAllTrials.mockReturnValueOnce(allTrials);
    const result = await getTrials({
      countryCode: "FR"
    });
    expect(thirdPartyApiAdapterStub.GetAllTrials).toHaveBeenCalled();
    expect(result).toMatchSnapshot();
  });
});
