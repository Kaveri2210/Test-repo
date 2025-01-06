const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const beforeRunHook = async (details) => {
  console.log('Running beforeRunHook with details:', details);
};

const afterRunHook = async () => {
  console.log('Running afterRunHook');
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      allureWriter(on, config);
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
      return config;
    },
    specPattern: 'cypress/e2e/*.js',
    defaultCommandTimeout: 6000,
    viewportWidth: 1680,
    viewportHeight: 1020,
    experimentalOriginDependencies: true,
    experimentalOriginDependencies: true,
    video: true,
    videoCompression: 32,
    videoFolder: 'cypress/videos',
  },
  env: {
    url: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  },
  // reporter: 'mocha-allure-reporter',
  // reporterOptions: {
  //   allure: true,
  //   outputDir: 'cypress/allure-results',
  // },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',  // Directory where the reports will be saved
    reportFilename: 'report',                 // Name of the report file
    overwrite: true,                          // Overwrite the report if exists
    html: true,                               // Generate HTML report
    json: true,  
  }
});
