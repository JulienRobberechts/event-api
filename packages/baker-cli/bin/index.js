#!/usr/bin/env node

const program = require("commander");
const qAndA = require("../lib/qa");
const registerListCommand = require("../lib/list/command");

console.log("Inato Command line");

registerListCommand(program);

if (process.argv.length === 2) {
  qAndA();
}

program.parse(process.argv);
