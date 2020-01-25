var express = require("express");
var router = express.Router();
const {
  getOngoingTrialsBySponsor
} = require("../controllers/trials-controller");
const debug = require("debug")("server:api:trials");

/* GET trials listing. */
router.get("/:LabName", async function(req, res, next) {
  const sponsorName = req.params.LabName;
  debug("Endpoint OngoingTrials for Sponsor ", sponsorName);
  const result = await getOngoingTrialsBySponsor(sponsorName);
  res.send(result);
});

module.exports = router;
