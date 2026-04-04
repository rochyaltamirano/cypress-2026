describe('Flujos de login', () => {
   beforeEach(() => {
      cy.visit('auth/login');
   });


   it('Login exitoso con credenciales validas', () => {
        cy.fixture('login').then((usuario) => {
                   
            cy.get('[name="email"]').type(usuario.email);
            cy.get('[name="password"]').type(usuario.password);
            cy.get('[data-at="submit-login"]').click();

            //validar que se encuentre logueado
            cy.url().should('include', 'https://www.laboratoriodetesting.com/')    
            cy.get('[data-at="header"]').find('ul')
            .should('exist').find('li')
            .should('have.length', 4);     
            //valida que aparezca "Favoritos"
            cy.get(':nth-child(2) > .hover\\:text-gray-200').should('be.visible')
            .and('contains.text','Favoritos');

        })
   });
})