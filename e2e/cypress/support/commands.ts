import { loginButton, passwordInput, userInput } from "../selectors/login";

Cypress.Commands.add('login', (user, password) => {
  cy.visit('/wp-admin');
  userInput().should('exist').type(user);
  passwordInput().should('exist').type(password);
  loginButton().should('exist').click();
});

Cypress.Commands.add('exists', (selector: string) => cy.get('body').then($body => {
  const results = $body.find(selector);

  return results.length > 0;
}));
