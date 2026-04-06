import * as LoginPage from '../../support/selectores/login-page'
describe('Flujos de login', () => {
   beforeEach(() => {
      cy.visit('auth/login');
   });


   it('Login exitoso con credenciales validas', () => {
        cy.fixture('login').then((usuario) => {
                   
            cy.get(LoginPage.EMAIL).type(usuario.email);
            cy.get(LoginPage.PASSWORD).type(usuario.password);
            cy.get(LoginPage.LOGINBTN).click();

            //validar que se encuentre logueado
            cy.url().should('include', 'https://www.laboratoriodetesting.com/')    
            cy.get(LoginPage.HEADER).find('ul')
            .should('exist').find('li')
            .should('have.length', 4);     
            //valida que aparezca "Favoritos"
            cy.get(LoginPage.FAVORITOS_ITEM).should('be.visible')
            .and('contains.text','Favoritos');

        })
   });

   it('Login fallido con credenciales incorrectas', () => {
        cy.fixture('login').then((usuario) => {
            cy.get(LoginPage.EMAIL).type(usuario.email);
            cy.get(LoginPage.PASSWORD).type(usuario.password + 'r'); //se agrega un caracter al password para que falle
            cy.get(LoginPage.LOGINBTN).click();
            cy.get(LoginPage.MODAL_LOGIN_ERROR).should('be.visible')
                .and('have.text', 'No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.');            
        });
    });

    it('Verificar que todos los campos sean obligatorios', () => {
        cy.fixture('login').then((usuario) => {
            cy.get(LoginPage.EMAIL).type(usuario.email);
            cy.get(LoginPage.LOGINBTN).should('be.disabled');
            cy.get(LoginPage.PASSWORD).type(usuario.password + 'r'); //se agrega un caracter al password para que falle
            cy.get(LoginPage.LOGINBTN).should('be.enabled');
        });
    });

    it('Verificar el formato del email', () => {
        const emailInvalido = 'usuario@dominio';
        const email = 'usuario@dominio.com'
        cy.get(LoginPage.EMAIL).type(emailInvalido);
        cy.get(LoginPage.ERROR_MESSAGE).eq(0).should('have.text', 'Email inválido');
        cy.get(LoginPage.EMAIL).clear().type(email); //el clear limpia el campo antes de ingresar el siguiente texto
        cy.get(LoginPage.ERROR_MESSAGE).eq(0).should('not.be.visible');
    });

    it('Verificar redireccion del botón Crea Una', () => {
        cy.get(LoginPage.CREATE_ACCOUNT_BTN).click();
        cy.url().should('includes', 'auth/signup')
    });
})