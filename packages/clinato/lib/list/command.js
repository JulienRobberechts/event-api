const registerCommand = program => {
  // $ clinato list
  program
    .command("list")
    .alias("ls")
    .description("List trials")
    .option("-c, --country [value]", "country of the trial", "*")

    .action(function(args) {
      list(args);
    });
};

module.exports = registerCommand;
