const colors = require("colors");
const axios = require("axios");
const countries = require("./countries.json");

const apiRoot = "http://localhost:3033";

const list = args => {
  const validArgs = { country: getCountryArg(args.country) };
  formatTrialsRequest(validArgs);
  queryTrialsApi(validArgs, formatTrialsList);
};

const queryTrialsApi = ({ country }, formatTrialsList) => {
  return axios
    .get(
      country
        ? `${apiRoot}/OngoingTrials?country=${country}`
        : `${apiRoot}/OngoingTrials`
    )

    .then(function(response) {
      formatTrialsList(response.data);
    })
    .catch(function(error) {
      console.log("Error: ", error);
    });
};

const getCountryArg = country => {
  if (!country || country === "*") return null;

  const countryByCode = countries.find(
    c => c.code.toUpperCase() === country.toUpperCase()
  );
  if (countryByCode) return countryByCode.code;

  const countryByName = countries.find(
    c => c.name.toUpperCase() === country.toUpperCase()
  );
  if (countryByName) return countryByName.code;

  console.log(colors.red(`invalid country '${country}' replaced by *`));
  return null;
};

const formatTrialsRequest = args => {
  console.log("");
  console.log(" Trials list ");
  console.log("------------------");
  console.log(colors.gray(" Filters"));
  console.log(" ongoing: %s", colors.bold("Yes"));
  console.log(" country: %s", colors.bold(args.country ? args.country : "All"));
  console.log("------------------");
};

const formatTrialsList = trials => {
  console.log(` ${trials.length} trial(s) found`);
  console.log("");
  trials.forEach(trial => {
    console.log(" * %s %s", trial.name, colors.green(`(${trial.sponsor})`));
  });
  console.log("------------------");
};

module.exports = list;
