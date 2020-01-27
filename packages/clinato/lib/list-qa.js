const inquirer = require("inquirer");
const colors = require("colors");
const pad = require("pad");
const countries = require("./countries.json");
const list = require("./list");

const questions = [
  {
    type: "list",
    name: "country",
    message: "Choose the country",
    choices: countries.map(c => c.code)
  }
];

module.exports = function() {
  console.log("  List of ongoing trials");
  console.log("-----------------------");
  inquirer.prompt(questions).then(function({ country }) {
    list({ country });
  });
};
