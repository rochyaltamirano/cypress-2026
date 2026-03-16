module.exports = {
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: {
      openMode: 2,
      runMode: 1 
    }
  },
};
