var express = require("express");
var router = express.Router();

const { wrapAsync } = require("../utils/errors");
const { get3ValBooleanParam } = require("../utils/parameters/threeValParam");
const debug = require("debug")("server:api:events");

const apiAdapter = process.env.SAMPLE_MODE
  ? require("../adapters/openEventApi.mock")
  : require("../adapters/openEventApi");

const EventsController = require("../controllers/events-controller");
const eventsController = new EventsController({ apiAdapter });

/* GET events listing. */
router.get(
  "/",
  wrapAsync(async function (req, res, next) {
    const ongoing = get3ValBooleanParam(req.query.ongoing);
    // debug("Endpoint events: ongoing ", ongoing);

    const type = req.query.type;
    const countryCode = req.query.country;
    // debug("Endpoint events: type ", type);
    const result = await eventsController.getEvents({
      ongoing,
      type,
      countryCode
    });
    res.send(result);
  })
);

module.exports = router;
