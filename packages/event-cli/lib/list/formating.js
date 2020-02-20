const colors = require("colors");

const formatHeader = args => {
  console.log("");
  console.log(" Events list ");
  // console.log("------------------");

  const country = colors.bold(args.country ? args.country : "All");
  console.log(`${colors.gray(` Filters : ongoing: Yes, country: ${country}`)}`);

  // console.log(colors.gray(" Filters"));
  // console.log(" ongoing: %s", colors.bold("Yes"));
  // console.log(" country: %s", colors.bold(args.country ? args.country : "All"));
  console.log("------------------");
};

const formatBody = events => {
  console.log(colors.gray(` ${events.length} event(s) found`));
  console.log("");
  events.forEach(event => {
    const name = colors.cyan(event.name);
    const type = colors.green("(" + event.type + ")");
    const period = colors.blue(`[${event.start_date} / ${event.end_date}]`);
    console.log(` * ${name} ${type} ${period}`);
  });
};

module.exports = { formatHeader, formatBody };
