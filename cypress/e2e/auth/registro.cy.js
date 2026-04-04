const { faker, it } = require('@faker-js/faker');

describe('Flujo de registro', () => {
   beforeEach(() => {
      cy.visit('/auth/signup');
   });

   it('Registro de usuario exitoso usando fixture', () => {
         //registrar al usuario
        cy.fixture('registro').then((usuario) => {
            const sufijoRandom = Math.floor(100 + Math.random() * 900) 
            const email = `${usuario.emailPre}${sufijoRandom}@${usuario.dominio}`
                   
            cy.get('[name="email"]').type(email);
            cy.get('[name="name"]').type(usuario.nombre);
            cy.get('[name="password"]').first().type(usuario.password);
            cy.get('[name="repeatPassword"]').type(usuario.password);
        })
        cy.get('[data-at="submit-signup"').click();

        cy.get('#swal2-title').should('have.text','Operación Exitosa');

        //redirigir a la pantalla de login
        cy.get('.swal2-confirm').click();
        cy.url().should('include', 'auth/login')
        
   });

    it('Registro de usuario exitoso usando faker js', () => {
        //registrar al usuario
        const password =  faker.internet.password();

        cy.get('[name="email"]').type(faker.internet.email());
        cy.get('[name="name"]').type(faker.person.fullName());
        cy.get('[name="password"]').first().type(password);
        cy.get('[name="repeatPassword"]').type(password);
        
        cy.get('[data-at="submit-signup"').click();

        cy.get('#swal2-title').should('have.text','Operación Exitosa');

        //redirigir a la pantalla de login
        cy.get('.swal2-confirm').click();
        cy.url().should('include', 'auth/login')
        
   });
})