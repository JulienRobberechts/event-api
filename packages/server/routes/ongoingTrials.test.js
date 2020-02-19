const request = require("supertest");

const app = require("../app");
const { mockThirdPartyApi } = require("../tests/mock/thirdParty");

const api = request(app);

describe("GET /OngoingTrials", () => {
  beforeEach(() => {
    mockThirdPartyApi();
  });
  it("all", async () => {
    const response = await api.get("/OngoingTrials").expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("sponsor Sanofi", async () => {
    const response = await api.get("/OngoingTrials?sponsor=Sanofi").expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("sponsor AstraZeneca", async () => {
    const response = await api
      .get("/OngoingTrials?sponsor=AstraZeneca")
      .expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("sponsor UnknownLab", async () => {
    const response = await api
      .get("/OngoingTrials?sponsor=UnknownLab")
      .expect(200);
    expect(response.body).toEqual([]);
  });
  it("country france", async () => {
    const response = await api.get("/OngoingTrials?country=FR").expect(200);
    expect(response.body).toMatchSnapshot();
  });
});
