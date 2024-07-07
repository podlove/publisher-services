import { loginButton, passwordInput, userInput } from "../selectors/login";

Cypress.Commands.add('login', (user, password) => {
  cy.visit('/wp-admin');
  cy.wait(250);
  userInput().should('exist').type(user, { delay: 100 });
  cy.wait(250);
  passwordInput().should('exist').type(password, { delay: 100 });
  cy.wait(250);
  loginButton().should('exist').click();
});

Cypress.Commands.add('exists', (selector: string) => cy.get('body').then($body => {
  const results = $body.find(selector);

  return results.length > 0;
}));
