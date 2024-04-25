// src/Gherkin/cucumber.js
module.exports = {
  default: `--require-module @babel/register --require src/Gherkin/step_definitions/**/*.js --require src/Gherkin/features/**/*.feature`
};
