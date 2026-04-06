import * as RegistroPage from '../../support/selectores/registro-page'
const { faker } = require('@faker-js/faker');
describe('Flujo de registro', () => {
   beforeEach(() => {
      cy.visit('/auth/signup');
   });
   
    it('Registro de usuario exitoso usando fixture', () => {
         //registrar al usuario
        cy.fixture('registro').then((usuario) => {
            const sufijoRandom = Math.floor(100 + Math.random() * 900) 
            const email = `${usuario.emailPre}${sufijoRandom}@${usuario.dominio}`
                   
            cy.get(RegistroPage.EMAIL).type(email);
            cy.get(RegistroPage.NAME).type(usuario.nombre);
            cy.get(RegistroPage.PASSWORD).first().type(usuario.password);
            cy.get(RegistroPage.PASSWORD_REPEAT).type(usuario.password);
        })
        cy.get(RegistroPage.CREATE_USER_BTN).click();

        cy.get('#swal2-title').should('have.text','Operación Exitosa');

        //redirigir a la pantalla de login
        cy.get('.swal2-confirm').click();
        cy.url().should('include', 'auth/login')
        
   });

    it('Registro de usuario exitoso usando faker js', () => {
        //registrar al usuario
        const password =  faker.internet.password();

        cy.get(RegistroPage.EMAIL).type(faker.internet.email());
        cy.get(RegistroPage.NAME).type(faker.person.fullName());
        cy.get(RegistroPage.PASSWORD).first().type(password);
        cy.get(RegistroPage.PASSWORD_REPEAT).type(password);
        
        cy.get(RegistroPage.CREATE_USER_BTN).click();

        cy.get('#swal2-title').should('have.text','Operación Exitosa');

        //redirigir a la pantalla de login
        cy.get('.swal2-confirm').click();
        cy.url().should('include', 'auth/login')
        
   });

   it('Verificar politíca de longitud del password', () => {
           const password = faker.internet.password({length: 7}); //el parámetro length especifica la longitud del password
   
           cy.get(RegistroPage.PASSWORD).type(password);
           cy.get(RegistroPage.MIN_CARACTERES).as('mensajeError').should('be.visible')
               .and('include.text', 'La contraseña debe tener al menos 8 caracteres');
           cy.get(RegistroPage.PASSWORD).type(password + '1'); //adicionamos otro caracter para cumplir la regla
           cy.wait(5000)
           cy.get('@mensajeError').should('exist').and('not.be.visible'); // el elemento debe existir en el DOM pero no debe ser visible
   });

    it('Verificar que los password coincidan', () => {
        const password = '12345678';
        const passwordIncompleto = password.slice(0, -1); //con la función slice 0, -1 se quita el último caracter, es decir que se obtiene 1234567

        cy.get(RegistroPage.PASSWORD).type(password);
        cy.get(RegistroPage.PASSWORD_REPEAT).as('confirmarPassword').type(passwordIncompleto);
        cy.get(RegistroPage.PASSWORD_NOT_EQUALS).as('mensajeError').should('be.visible')
            .and('have.text', 'Las contraseñas no coinciden');
        cy.get('@confirmarPassword').clear().type(password); //con clear, se limpia el campo para ingresar nuevamente el password
        cy.get('@mensajeError').should('exist').and('not.be.visible');
    });

    it('Verificar redirección del botón Inicia Sesión', () => {
        cy.get(RegistroPage.LINK_SESION).click();
        cy.url().should('includes', '/auth/login')
    });

})