var express = require("express");
var router = express.Router();
const {
  getOngoingTrialsBySponsor
} = require("../controllers/trials-controller");

/* GET trials listing. */
router.get("/", async function(req, res, next) {
  const sponsorName = ""; //
  const result = await getOngoingTrialsBySponsor(sponsorName);
  res.send(result);
});

module.exports = router;
