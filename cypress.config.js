module.exports = {
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: {
      openMode: 2,
      runMode: 2 
    },
    baseUrl: 'https://www.laboratoriodetesting.com',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 80000,
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      username: 'usuarioPrueba',
      api: 'api123'
    }
  },
};
