const colors = require("colors");

const formatHeader = args => {
  console.log("");
  console.log(" Trials list ");
  console.log("------------------");
  console.log(colors.gray(" Filters"));
  console.log(" ongoing: %s", colors.bold("Yes"));
  console.log(" country: %s", colors.bold(args.country ? args.country : "All"));
  console.log("------------------");
};

const formatBody = trials => {
  console.log(` ${trials.length} trial(s) found`);
  console.log("");
  trials.forEach(trial => {
    console.log(" * %s %s", trial.name, colors.green(`(${trial.sponsor})`));
  });
  console.log("------------------");
};

module.exports = { formatHeader, formatBody };
