const request = require("supertest");

const app = require("../app");
const { mockThirdPartyApi } = require("../tests/mock/thirdParty");

const api = request(app);

describe("GET /events", () => {
  beforeEach(() => {
    mockThirdPartyApi();
  });
  it("all", async () => {
    const response = await api.get("/events").expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("type Music", async () => {
    const response = await api.get("/events?type=Music").expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("ongoing events", async () => {
    const response = await api
      .get("/events?ongoing=true")
      .expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("ongoing events of type Experience", async () => {
    const response = await api
      .get("/events?type=Experience")
      .expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("events with type Unknown", async () => {
    const response = await api
      .get("/events?type=Unknown")
      .expect(200);
    expect(response.body).toEqual([]);
  });
  it("country france", async () => {
    const response = await api.get("/events?country=FR").expect(200);
    expect(response.body).toMatchSnapshot();
  });
});
