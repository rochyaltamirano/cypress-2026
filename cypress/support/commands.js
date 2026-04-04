// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('addToCart', () => {
    cy.get('[data-at="product-card"]').eq(3)
        .find('.block.font-sans').eq(0).invoke('text').
            then((description) => {
                cy.wrap(description).as('productDescription');
            })
        
    cy.get('[data-at="product-card"]').eq(3)
        .find('.block.font-sans').eq(1).invoke('text').
            then((price) => {
                cy.wrap(price).as('productPrice');
            })
    //añadir al carrito
    cy.get('.align-middle.select-none').eq(3).click();
})