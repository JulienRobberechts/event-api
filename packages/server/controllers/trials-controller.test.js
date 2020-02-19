const TrialsController = require("../controllers/trials-controller");
const apiAdapter = require("../adapters/thirdPartyApi.mock");
const trialsController = new TrialsController({ apiAdapter });

describe("trials controller and adapter", () => {
  it("should return all ongoing trials", async () => {
    const result = await trialsController.getTrials({});
    expect(result).toMatchSnapshot();
  });
  it("should return ongoing trials for Sanofi", async () => {
    const result = await trialsController.getTrials({ sponsorName: "Sanofi" });
    expect(result).toMatchSnapshot();
  });
  it("should return ongoing trials for AstraZeneca", async () => {
    const result = await trialsController.getTrials({
      sponsorName: "AstraZeneca"
    });
    expect(result).toMatchSnapshot();
  });
  it("should return no trials for unknown lab", async () => {
    const result = await trialsController.getTrials({
      sponsorName: "UnknownLab"
    });
    expect(result).toEqual([]);
  });
  it("should return ongoing trials in France", async () => {
    const result = await trialsController.getTrials({
      countryCode: "FR"
    });
    expect(result).toMatchSnapshot();
  });
});
