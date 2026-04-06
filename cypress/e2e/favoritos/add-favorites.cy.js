import * as FavoritePage from '../../support/selectores/favorites-page'

describe('Favoritos', () => {

    beforeEach(() => {
        cy.visit('auth/login');
        cy.fixture('login').then((usuario) => {                   
                cy.get(FavoritePage.EMAIL).type(usuario.email);
                cy.get(FavoritePage.PASSWORD).type(usuario.password);
                cy.get(FavoritePage.LOGINBTN).click();
        })
        cy.url().should('not.include', 'auth/login');
   });

   it('Agregar productos a favoritos', () => {     
        cy.visit('whishlist');
     
        cy.get(FavoritePage.FAVORITE_CARD).then(($item) =>{
            cy.wrap($item.length).as('favorito');
        });

        cy.visit('');
        
        cy.get(FavoritePage.PRODUCT_CARD).first().click();
        cy.get(FavoritePage.ADD_TO_FAVORITES).click();
        cy.visit('whishlist');

        cy.get('@favorito').then((favoritosLista) =>{
        
            cy.get(FavoritePage.FAVORITE_CARD).then(($listaActualizada) => {
                expect($listaActualizada).to.have.length(favoritosLista + 1)
            });
        });
   });

   it('Quitar un producto de favoritos', () => {
        cy.visit('whishlist');

        cy.get(FavoritePage.FAVORITE_CARD).then(($item) =>{
            cy.wrap($item.length).as('favorito');
        });

        cy.get(FavoritePage.FAVORITE_CARD).last().click();
        cy.get(FavoritePage.REMOVE_FROM_FAVORITES).should('be.visible').click();
        cy.get(FavoritePage.ADD_TO_FAVORITES).should('be.visible');
        cy.visit('whishlist');

        cy.get('@favorito').then((favoritosLista) =>{
            cy.get(FavoritePage.FAVORITE_CARD).then(($listaActualizada) => {
                expect($listaActualizada).to.have.length(favoritosLista - 1)
            });
        });    
   });
})