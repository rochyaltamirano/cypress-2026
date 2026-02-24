describe ('Example to-do app', ()=>{
    //precondición
    beforeEach(() => {
        cy.visit('https://www.laboratoriodetesting.com/');                      
    });
    

    //Caso de prueba 1
    it ('Validar título de producto agregado a carrito', ()=>{
        cy.get('.inline-block').click();
        cy.contains('Añadir al carrito').click();
        cy.get('[data-at=cart-opener-mobile]').click();

        cy.get('.py-5.overflow-auto').should('contains.text', 'Bandas Elásticas de Resistencia');
        cy.get('.text-black.text-center').should('have.text', 'Total: $350.00');

        cy.get('[data-at=empty-cart]').click();
        cy.get('.text-black.text-center').should('have.text', 'Total: $0.00');
    });

    it('Encontrar elementos por texto', () => {
        cy.contains('Acceder').click();
    });

// [atributo="valor"]
    it.only('Encontrar elementos por atributo', () => {
        cy.visit('https://www.laboratoriodetesting.com/products/chaqueta-deportiva-para-correr');
        cy.get('[data-at="increment-quantity"]').click();
        cy.get('[data-at="add-to-cart"]').click();
    });
})