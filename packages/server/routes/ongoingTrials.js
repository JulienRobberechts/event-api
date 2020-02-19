var express = require("express");
var router = express.Router();
const {
  getOngoingTrialsBySponsor
} = require("../controllers/trials-controller");

const { wrapAsync } = require("../utils/errors");
const { get3ValBooleanParam } = require("../utils/parameters/threeValParam");
const debug = require("debug")("server:api:trials");

/* GET trials listing. */
router.get(
  "/",
  wrapAsync(async function (req, res, next) {
    const ongoing = get3ValBooleanParam(req.query.ongoing);
    debug("Endpoint OngoingTrials for ongoing ", ongoing);

    const sponsorName = req.query.sponsor;
    const countryCode = req.query.country;
    debug("Endpoint OngoingTrials for Sponsor ", sponsorName);
    const result = await getOngoingTrialsBySponsor({
      ongoing,
      sponsorName,
      countryCode
    });
    res.send(result);
  })
);

module.exports = router;
