// <reference types="Cypress" />

context('Main page', () => {
	it('visit successfully', () => {
		cy.visit('/');
	});
});
