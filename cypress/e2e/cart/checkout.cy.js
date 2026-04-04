describe('Flujos de checkout', () => {

    beforeEach(() => {
        cy.visit('auth/login');
        cy.fixture('login').then((usuario) => {                   
                cy.get('[name="email"]').type(usuario.email);
                cy.get('[name="password"]').type(usuario.password);
                cy.get('[data-at="submit-login"]').click();
        })
   });

   it('Checkout exitoso del producto', () => {
        cy.addToCart();

        cy.fixture('checkout').then((cliente) => {
        cy.contains('Ir al checkout').click({force: true});
        cy.contains('Completar Pago').should('be.disabled');
        
        cy.get('[name="name"]').type(cliente.nombre);
        cy.get('[name="lastname"]').type(cliente.apellido);
        cy.get('[name="email"]').type(cliente.email);
        cy.get('[name="address"]').type(cliente.direccion);
        cy.get('[name="country"]').select(cliente.pais);

        cy.get('[name="nameHolder"]').type(cliente.nombre);
        cy.get('[name="cardNumber"]').type(cliente.num_tarjeta);
        cy.get('[name="expiryDate"]').type(cliente.fecha_exp);
        cy.get('[name="securityCode"]').type(cliente.cvv);

        cy.contains('Completar Pago').should('be.enabled');
        cy.contains('Completar Pago').click();
        cy.get('#swal2-html-container').should('have.text', 'Tu orden se ha creado con éxito, podrás ver tu historial en tu cuenta');

   })
   });

   it('Checkout con tarjeta inválida', () => {
        cy.addToCart();

        cy.contains('Ir al checkout').click({force: true});
        cy.contains('Completar Pago').should('be.disabled');

        //comparar descripción del homepage vs cart
        cy.get('@productDescription').then((description) => {
            cy.get('.text-black').eq(1).invoke('text').then((descriptionCart) => {
                expect(descriptionCart.trim()).to.eq(description.trim());
            });
        })
        //comparar precio del homepage vs cart
        cy.get('@productPrice').then((price) => {
            cy.get('.text-black').eq(3).invoke('text').then((priceCart) => {
                expect(priceCart.trim()).to.eq(price.trim());
            });
        })

        cy.fixture('checkout').then((cliente) => {
            cy.get('[name="name"]').type(cliente.nombre);
            cy.get('[name="lastname"]').type(cliente.apellido);
            cy.get('[name="email"]').type(cliente.email);
            cy.get('[name="address"]').type(cliente.direccion);
            cy.get('[name="country"]').select(cliente.pais);

            cy.get('[name="nameHolder"]').type(cliente.nombre);
            cy.get('[name="cardNumber"]').type(cliente.num_tarjeta_invalida);
            cy.get('[name="expiryDate"]').type(cliente.fecha_exp_invalida);
            cy.get('[name="securityCode"]').type(cliente.cvv_invalida);    
        })

        cy.contains('Completar Pago').should('be.enabled');
        cy.contains('Completar Pago').click();

        cy.get('#swal2-html-container').should('have.text', 'Rechazo general de la entidad.');

   });

   it('Checkout con tarjeta sin fondos', () => {
         cy.addToCart();

        cy.contains('Ir al checkout').click({force: true});
        cy.contains('Completar Pago').should('be.disabled');

         cy.fixture('checkout').then((cliente) => {
            cy.get('[name="name"]').type(cliente.nombre);
            cy.get('[name="lastname"]').type(cliente.apellido);
            cy.get('[name="email"]').type(cliente.email);
            cy.get('[name="address"]').type(cliente.direccion);
            cy.get('[name="country"]').select(cliente.pais);

            cy.get('[name="nameHolder"]').type(cliente.nombre);
            cy.get('[name="cardNumber"]').type(cliente.num_tarjeta_nf);
            cy.get('[name="expiryDate"]').type(cliente.fecha_exp_nf);
            cy.get('[name="securityCode"]').type(cliente.cvv_nf);    
        })

        cy.contains('Completar Pago').should('be.enabled');
        cy.contains('Completar Pago').click();

        cy.get('#swal2-html-container').should('have.text', 'Fondos Insuficientes');



   });

});