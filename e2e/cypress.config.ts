import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'http://localhost:8080',
    supportFile: './cypress/support/index.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
