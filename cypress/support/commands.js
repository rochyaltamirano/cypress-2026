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

Cypress.Commands.add('validateSavedText', (alias, selector) => {
    cy.get(alias).then((savedText) => {
        cy.get(selector).invoke('text').then((currentText) => {
            expect(currentText.trim()).to.eq(savedText.trim())
        });
    })
})

Cypress.Commands.add('validateDate', (selector) => {
    cy.get(selector).first().invoke('text').then((dateToday) => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2,'0');
        const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        const month = months[date.getMonth()];
        const year = String(date.getFullYear()).slice(-2);
        const expectedDate = `${day} ${month}, ${year}`;
       
        expect(dateToday.trim().toLowerCase()).to.equal(expectedDate);

    });
})

Cypress.Commands.add('loginByAPI', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'https://api.laboratoriodetesting.com/api/v1/auth/login',
        body: {
            email: email,
            password: password
        }
});
})