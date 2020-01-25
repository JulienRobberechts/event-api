const sampleTrials = require("./trials.test-data");
var debug = require("debug")("server:api:trials");

const {
  getOngoingTrialsBySponsor
} = require("../controllers/trials-controller");

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

describe("trials-controller", () => {
  it("should return ongoing trials for Sanofi", async () => {
    const result = await getOngoingTrialsBySponsor("Sanofi");
    expect(result).toEqual(expectedOngoingTrialsForSanofi);
  });
});

module.exports = { getOngoingTrialsBySponsor };
