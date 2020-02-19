const colors = require("colors");

const formatHeader = args => {
  console.log("");
  console.log(" Trials list ");
  // console.log("------------------");

  const country = colors.bold(args.country ? args.country : "All");
  console.log(`${colors.gray(` Filters : ongoing: Yes, country: ${country}`)}`);

  // console.log(colors.gray(" Filters"));
  // console.log(" ongoing: %s", colors.bold("Yes"));
  // console.log(" country: %s", colors.bold(args.country ? args.country : "All"));
  console.log("------------------");
};

const formatBody = trials => {
  console.log(colors.gray(` ${trials.length} trial(s) found`));
  console.log("");
  trials.forEach(trial => {
    const name = colors.cyan(trial.name);
    const sponsor = colors.green("(" + trial.sponsor + ")");
    const period = colors.blue(`[${trial.start_date} / ${trial.end_date}]`);
    console.log(` * ${name} ${sponsor} ${period}`);
  });
};

module.exports = { formatHeader, formatBody };
