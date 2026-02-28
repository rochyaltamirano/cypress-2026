describe('test description', () => {
   beforeEach(() => {
        cy.setCookie('__AUTH-TOKEN-APP','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2NzM0YzUwLTNkMmMtNDA0NS1iODJlLWY0NGEzYmZlOGFiOSIsImlhdCI6MTc3MjI5MjI5MiwiZXhwIjoxNzc0ODg0MjkyfQ.9mHqhs1O1g8rz0xhXmMRTgVDug49_kqCOxXOrXtGy6A',
            { secure: true }
        ); //en lugar del login por usuario/contraseña
        cy.visit('https://www.laboratoriodetesting.com/form-practice');                      
    });

    it('manejo de dropdown', () => {

        cy.get('[data-at="practice-country"]').select('Colombia');

        cy.get('[data-at="practice-country"]').should('be.visible').and('have.value','Colombia');

    });
})