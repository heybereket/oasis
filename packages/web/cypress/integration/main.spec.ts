// <reference types="Cypress" />

import { loginWithTesting } from '../utils/loginAsTesting';

context('Feed page', () => {
  beforeEach(() => {
    loginWithTesting();
  });

  it('Navbar has user info', () => {
    cy.visit('/');
    cy.get('#navbar-user-avatar').should('have.attr', 'alt', '@testing');
  });
});
