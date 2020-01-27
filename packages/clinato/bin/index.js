#!/usr/bin/env node

const program = require("commander");
const list = require("../lib/list");
const listQA = require("../lib/list-qa");

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

if (process.argv.length === 2) {
  listQA();
}

const result = program.parse(process.argv);
// console.log("result", result);
