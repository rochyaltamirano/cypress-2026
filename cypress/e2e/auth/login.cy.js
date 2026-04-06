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

   it('Login fallido con credenciales incorrectas', () => {
        cy.fixture('login').then((usuario) => {
            cy.get('[name="email"]').type(usuario.email);
            cy.get('[name="password"]').type(usuario.password + 'r'); //se agrega un caracter al password para que falle
            cy.get('[data-at="submit-login"]').click();
            cy.get('#swal2-html-container').should('be.visible')
                .and('have.text', 'No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.');            
        });
    });

    it('Verificar que todos los campos sean obligatorios', () => {
        cy.fixture('login').then((usuario) => {
            cy.get('[name="email"]').type(usuario.email);
            cy.get('[data-at="submit-login"]').should('be.disabled');
            cy.get('[name="password"]').type(usuario.password + 'r'); //se agrega un caracter al password para que falle
            cy.get('[data-at="submit-login"]').should('be.enabled');
        });
    });

    it('Verificar el formato del email', () => {
        const emailInvalido = 'usuario@dominio';
        const email = 'usuario@dominio.com'
        cy.get('[name="email"]').type(emailInvalido);
        cy.get('.text-red-500').eq(0).should('have.text', 'Email inválido');
        cy.get('[name="email"]').clear().type(email); //el clear limpia el campo antes de ingresar el siguiente texto
        cy.get('.text-red-500').eq(0).should('not.be.visible');
    });

    it('Verificar redireccion del botón Crea Una', () => {
        cy.get('.text-md.underline').click();
        cy.url().should('includes', 'auth/signup')
    });
})