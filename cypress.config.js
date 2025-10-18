const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), process.env.ENV_FILE || ".env")
});

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "http://localhost:2221/", // 🔥 identycznie jak w Playwright
    setupNodeEvents(on, config) {
      // Przekazujemy zmienne do Cypress.env()
      config.env.USERNAME = process.env.ADMIN_USERNAME;
      config.env.PASSWORD = process.env.ADMIN_PASSWORD;
      return config;
    },
    experimentalStudio: true,
    // experimentalSkipBaseUrlCheck: true, // jeśli chcesz pominąć weryfikację
  },
});

