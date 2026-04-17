const { log } = require("util");

describe('test description', () => {
   beforeEach(() => {
        cy.task('getCookie').then((cookie) => {
            cy.visit('/');
            cy.setCookie('__AUTH-TOKEN-APP', cookie, { secure: true });
            cy.visit('/form-practice');
        });
    });

    it('Llenar formulario y enviar ', () => {

        cy.log(Cypress.env('username')) //print variable de entorno

        cy.get('[data-at="practice-submit"]').should('be.disabled').as('botonEnviar');

        cy.get('[data-at="practice-name"]').type('Juan', {force:true});
        cy.get(':nth-child(2) > .bg-gray-50').type('123');
      
        cy.get('#sch_Mañana').click();

        cy.get('[data-at="practice-country"]').select('Colombia');

        cy.get('[data-at="practice-interests-devops"]').check();

        cy.get('@botonEnviar').should('be.disabled');
        cy.get('[name="dateOfBirth"]').type('1991-09-14');

        cy.get('@botonEnviar').should('be.enabled');
        cy.get('@botonEnviar').click({force: true});

        cy.get('.swal2-confirm').click();

    });
})