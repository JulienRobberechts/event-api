const request = require("supertest");

const app = require("../app");
const { mockThirdPartyApi } = require("../tests/mock/thirdParty");

const api = request(app);

describe("GET /trials", () => {
  beforeEach(() => {
    mockThirdPartyApi();
  });
  it("all", async () => {
    const response = await api.get("/trials").expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("sponsor Sanofi", async () => {
    const response = await api.get("/trials?sponsor=Sanofi").expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("ongoing trials", async () => {
    const response = await api
      .get("/trials?ongoing=true")
      .expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("ongoing trials with sponsor AstraZeneca", async () => {
    const response = await api
      .get("/trials?sponsor=AstraZeneca")
      .expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("trials with sponsor UnknownLab", async () => {
    const response = await api
      .get("/trials?sponsor=UnknownLab")
      .expect(200);
    expect(response.body).toEqual([]);
  });
  it("country france", async () => {
    const response = await api.get("/trials?country=FR").expect(200);
    expect(response.body).toMatchSnapshot();
  });
});
