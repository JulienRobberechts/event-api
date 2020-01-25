var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var ongoingTrialsRouter = require("./routes/ongoingTrials");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/OngoingTrials", ongoingTrialsRouter);

app.use(function(err, req, res, next) {
  console.error("API Error: ", err);
  res.status(500).send({ errorMessage: "Internal error in Inato API" });
});

module.exports = app;
