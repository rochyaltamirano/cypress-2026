describe('Favoritos', () => {
   beforeEach(() => {
        const email = 'juantest@yopmail.com'
        const pass = '12345678'
        
        cy.loginByAPI(email,pass).then((response) => {
            cy.wrap(response.body.token).as('token')
        })
   });

   it('Agregar a favoritos', () => {
        cy.get('@token').then((token) => {
            cy.request({
                method: 'POST',
                url: 'https://api.laboratoriodetesting.com/api/v1/favorites',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    products: '7'
                }
              });

        });
   });

   it('Eliminar de favoritos', () => {
        cy.get('@token').then((token) => {
            cy.request({
                method: 'DELETE',
                url: 'https://api.laboratoriodetesting.com/api/v1/favorites/7',
                headers: {
                    Authorization: `Bearer ${token}`
                }
              });

        });
   });
});
