const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  chromeWebSecurity: false,
  e2e: {
    experimentalSessionAndOrigin: true,
    experimentalInteractiveRunEvents: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
