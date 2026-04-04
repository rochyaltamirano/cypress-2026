describe('Historial de compras', () => {
   
     beforeEach(() => {
        cy.visit('auth/login');
        cy.fixture('login').then((usuario) => {                   
                cy.get('[name="email"]').type(usuario.email);
                cy.get('[name="password"]').type(usuario.password);  
        })
        cy.get('[data-at="submit-login"]').click();
     });

     it('Checking del historial de compras', () => {
        cy.addToCart();

        cy.fixture('checkout').then((cliente) => {
            cy.contains('Ir al checkout').click({force: true});

            cy.get('[name="name"]').type(cliente.nombre);
            cy.get('[name="lastname"]').type(cliente.apellido);
            cy.get('[name="email"]').type(cliente.email);
            cy.get('[name="address"]').type(cliente.direccion);
            cy.get('[name="country"]').select(cliente.pais);

            cy.get('[name="nameHolder"]').type(cliente.nombre);
            cy.get('[name="cardNumber"]').type(cliente.num_tarjeta);
            cy.get('[name="expiryDate"]').type(cliente.fecha_exp);
            cy.get('[name="securityCode"]').type(cliente.cvv);

            cy.visit('my-account');
            cy.get('.underline.text-black').first().click();

            cy.validateSavedText('@productDescription', '.flex.items-center.gap-4 .font-bold');
            cy.validateSavedText('@productPrice', '.font-bold.text-lg');

            cy.validateDate('.flex.gap-2.my-3 p:nth-child(2)');

            cy.get('.bg-green-300').should('exist').and('be.visible');

       })
   });
})