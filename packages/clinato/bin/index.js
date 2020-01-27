#!/usr/bin/env node

const program = require("commander");
const list = require("../lib/list");

console.log("INATO Command line");

// $ clinato list
program
  .command("list")
  .alias("ls")
  .description("List trials")
  .option("-c, --country [value]", "country of the trial", "*")

  .action(function(args) {
    list(args);
  });

program.parse(process.argv);
