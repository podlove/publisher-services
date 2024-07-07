///<reference types="cypress-iframe" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(user: string, password: string): void;
      exists(string: string): Cypress.Chainable<boolean>;
    }
  }
}

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-iframe';

// Alternatively you can use CommonJS syntax:
// require('./commands')
