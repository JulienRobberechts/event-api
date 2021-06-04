#!/usr/bin/env node

const program = require("commander");
const qAndA = require("../lib/qa");
const registerListCommand = require("../lib/list/command");

program.version('1.0.1');
console.log("Event Command line");

registerListCommand(program);

console.log('process.argv', process.argv);

const DEFAULT_ARGS_COUNT = 2;
const argsCount = process.argv.length;

if (argsCount === DEFAULT_ARGS_COUNT) {
  console.log('=> Q/A mode...');
  qAndA();
  return;
} else if (argsCount > DEFAULT_ARGS_COUNT) {
  console.log('=> Direct execution mode (with arguments)...');
  program.parse(process.argv);
}
