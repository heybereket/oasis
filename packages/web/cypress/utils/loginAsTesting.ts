// <reference types="Cypress" />

export const loginWithTesting = (username = 'testing') => {
  cy.intercept('localhost:3000', (req) => {
    req.headers.authorization = `TESTING ${username}`;
  });
};
