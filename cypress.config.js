const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev/login',
    viewportWidth: 1880,
    viewportHeight: 1020,
    setupNodeEvents(on, config) {
      require('@shelex/cypress-allure-plugin/writer')(on, config)
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    reporter: 'allure-mochawesome',
    reporterOptions: {
      reportDir: 'allure-results',
      overwrite: false,
      html: false,
      json: true
    },
    env: {
      apiUrl: 'https://serverest.dev/'
    }
  },
});
