const inquirer = require("inquirer");
const colors = require("colors");
const countries = require("./countries.json");
const list = require("./index");

const questions = [
  {
    type: "list",
    name: "country",
    message: "Choose the country",
    choices: countries.map(c => c.code)
  }
];

module.exports = function () {
  console.log(colors.green(">> List of events"));
  inquirer.prompt(questions).then(function ({ country }) {
    list({ country });
  });
};
