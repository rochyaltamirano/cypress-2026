describe('test description', () => {
   beforeEach(() => {
        cy.setCookie('__AUTH-TOKEN-APP','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2NzM0YzUwLTNkMmMtNDA0NS1iODJlLWY0NGEzYmZlOGFiOSIsImlhdCI6MTc3MjI5MjI5MiwiZXhwIjoxNzc0ODg0MjkyfQ.9mHqhs1O1g8rz0xhXmMRTgVDug49_kqCOxXOrXtGy6A',
            { secure: true }
        ); //en lugar del login por usuario/contraseña
        cy.visit('https://www.laboratoriodetesting.com/form-practice');                      
    });

    it('Llenar formulario y enviar ', () => {
        cy.get('[data-at="practice-submit"]').should('be.disabled');

        cy.get('[data-at="practice-name"]').type('Juan', {force:true});
        cy.get(':nth-child(2) > .bg-gray-50').type('123');
      
        cy.get('#sch_Mañana').click();

        cy.get('[data-at="practice-country"]').select('Colombia');

        cy.get('[data-at="practice-interests-devops"]').check();

        cy.get('[data-at="practice-submit"]').should('be.disabled');
        cy.get('[name="dateOfBirth"]').type('1991-09-14');

        cy.get('[data-at="practice-submit"]').should('be.enabled');
        cy.get('[data-at="practice-submit"]').click({force: true});

        cy.get('.swal2-confirm').click();

    });
})