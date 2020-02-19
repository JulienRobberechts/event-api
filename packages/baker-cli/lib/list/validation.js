const colors = require("colors");
const countries = require("./countries.json");

const validateArgs = args => {
  const country = getCountryArg(args.country);
  return { country };
};

const getCountryArg = country => {
  if (!country || country === "*" || country === "All") return null;

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

module.exports = validateArgs;
