describe('Flujos de añadir a carrito de compras', () => {
   beforeEach(() => {
      cy.visit('');
   });

   it('Agregar un producto al carrito', () => {

    cy.addToCart();

    //validar #productos en el carrito - 1
    cy.get('.relative.rounded-full').first().
            should('have.text', '1').click();
    
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

        
    
   });
})