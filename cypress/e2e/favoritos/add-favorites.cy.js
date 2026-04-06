describe('Favoritos', () => {

    beforeEach(() => {
        cy.visit('auth/login');
        cy.fixture('login').then((usuario) => {                   
                cy.get('[name="email"]').type(usuario.email);
                cy.get('[name="password"]').type(usuario.password);
                cy.get('[data-at="submit-login"]').click();
        })
        cy.url().should('not.include', 'auth/login');
   });

   it('Agregar productos a favoritos', () => {     
        cy.visit('whishlist');
     
        cy.get('[data-at="favorite-card"]').then(($item) =>{
            cy.wrap($item.length).as('favorito');
        });

        cy.visit('');
        
        cy.get('.rounded-sm.aspect-square').first().click();
        cy.get('[data-at="add-to-favorites"]').click();
        cy.visit('whishlist');

        cy.get('@favorito').then((favoritosLista) =>{
        
            cy.get('[data-at="favorite-card"]').then(($listaActualizada) => {
                expect($listaActualizada).to.have.length(favoritosLista + 1)
            });
        });
   });

   it('Quitar un producto de favoritos', () => {
        cy.visit('whishlist');

        cy.get('[data-at="favorite-card"]').then(($item) =>{
            cy.wrap($item.length).as('favorito');
        });

        cy.get('[data-at="favorite-card"]').last().click();
        cy.get('[data-at="remove-from-favorites"]').should('be.visible').click();
        cy.get('[data-at="add-to-favorites"]').should('be.visible');
        cy.visit('whishlist');

        cy.get('@favorito').then((favoritosLista) =>{
            cy.get('[data-at="favorite-card"]').then(($listaActualizada) => {
                expect($listaActualizada).to.have.length(favoritosLista - 1)
            });
        });    
   });
})