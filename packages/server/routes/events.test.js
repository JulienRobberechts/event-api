const request = require("supertest");

const app = require("../app");
const { mockOpenEventApi } = require("../tests/mock/openEventApi");

const api = request(app);

describe("GET /events", () => {
  beforeEach(() => {
    mockOpenEventApi();
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
      .get("/events?ongoing=true&date=2020-02-21")
      .expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("events of type Experience", async () => {
    const response = await api.get("/events?type=Experience").expect(200);
    expect(response.body).toMatchSnapshot();
  });
  it("events with type Unknown", async () => {
    const response = await api.get("/events?type=Unknown").expect(200);
    expect(response.body).toEqual([]);
  });
  it("events in country spain", async () => {
    const response = await api.get("/events?country=ESP").expect(200);
    expect(response.body).toMatchSnapshot();
  });
});
