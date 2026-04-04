describe('test description', () => {
   beforeEach(() => {
        cy.setCookie('__AUTH-TOKEN-APP','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2NzM0YzUwLTNkMmMtNDA0NS1iODJlLWY0NGEzYmZlOGFiOSIsImlhdCI6MTc3MjI5MjI5MiwiZXhwIjoxNzc0ODg0MjkyfQ.9mHqhs1O1g8rz0xhXmMRTgVDug49_kqCOxXOrXtGy6A',
            { secure: true }
        ); //en lugar del login por usuario/contraseña
        cy.visit('https://www.laboratoriodetesting.com/form-practice');                      
    });

    it('check and uncheck', () => {
        cy.get('[data-at="practice-interests-manual"]').check();
        cy.get('[data-at="practice-interests-devops"]').check();

        cy.get('[data-at="practice-interests-manual"]').should('be.checked');
        cy.get('[data-at="practice-interests-devops"]').should('be.checked');

        cy.get('[data-at="practice-interests-automation"]').should('not.be.checked');

        
    });
})