var express = require("express");
var router = express.Router();
const {
  getOngoingTrialsBySponsor
} = require("../controllers/trials-controller");

const { wrapAsync } = require("../utils/errors");
const { ValidationError } = require("../utils/errors/ValidationError");
const debug = require("debug")("server:api:trials");

/* GET trials listing. */
router.get(
  "/:LabName",
  wrapAsync(async function(req, res, next) {
    const sponsorName = req.params.LabName;
    if (!sponsorName) {
      throw new ValidationError("the sponsor name is empty");
    }
    debug("Endpoint OngoingTrials for Sponsor ", sponsorName);
    const result = await getOngoingTrialsBySponsor(sponsorName);
    res.send(result);
  })
);

module.exports = router;