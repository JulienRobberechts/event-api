const list = require(".");

const registerCommand = program => {
  // $ event-cli list
  program
    .command("list")
    .alias("ls")
    .description("List events")
    .option("-c, --country [value]", "country of the event", "*")

    .action(function (args) {
      list(args);
    });
};

module.exports = registerCommand;
