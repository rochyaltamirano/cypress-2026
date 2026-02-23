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

        cy.get('.py-5.overflow-auto').should('contains.text', 'Bandas Elásticas de Resistencia')
    })

})