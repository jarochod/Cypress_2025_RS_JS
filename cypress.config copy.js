const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:2221/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true, // Włączanie Cypress Studio
  },
});
