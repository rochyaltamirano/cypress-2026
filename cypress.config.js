module.exports = {
  allowCypressEnv: false,

  e2e: {
    allowCypressEnv: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: {
      openMode: 1,
      runMode: 1 
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
