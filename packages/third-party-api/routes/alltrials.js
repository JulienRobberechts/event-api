var express = require("express");
var router = express.Router();
const allTrials = require("./trials.test-data.json");

/* GET all trials listing. */
router.get("/", function(req, res, next) {
  res.send(allTrials);
});

module.exports = router;
