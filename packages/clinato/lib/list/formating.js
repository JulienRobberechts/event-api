const colors = require("colors");

const formatHeader = args => {
  console.log("");
  console.log(" Trials list ");
  console.log("------------------");
  console.log(colors.gray(" Filters:"));
  console.log(" %s: %s", colors.gray("ongoing"), colors.bold("Yes"));
  console.log(
    " %s: %s",
    colors.gray("country"),
    colors.bold(args.country ? args.country : "All")
  );
  console.log("------------------");
};

const formatBody = trials => {
  console.log(colors.gray(` ${trials.length} trial(s) found`));
  // console.log("");
  trials.forEach(trial => {
    console.log(
      " * %s %s",
      colors.blue(trial.name),
      colors.green(`(${trial.sponsor})`)
    );
  });
  console.log("------------------");
};

module.exports = { formatHeader, formatBody };
