describe('Flujo de limpar carrito', () => {
   
    before(() => {
       cy.visit('');
    });

    it('Vaciar carrito de compras', () => {
        cy.addToCart();
        cy.get('.cart-grid.items-center').should('exist');

        cy.get('[data-at="empty-cart"]').click({force: true});

        cy.get('.cart-grid.items-center').should('not.exist');


    });
})