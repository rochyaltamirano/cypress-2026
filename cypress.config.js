module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        getCookie() {
          return config.env.cookie || null;
        }
      });
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
