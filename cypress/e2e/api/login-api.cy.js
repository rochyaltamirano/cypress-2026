describe('Login API requests', () => {
   
    it('Check Login', () => {
        const email = 'juantest@yopmail.com'
        const pass = '12345678'
        
        cy.loginByAPI(email,pass).then((response) => {
            expect(response.status).to.eq(201);
            cy.log(JSON.stringify(response.body));
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('email', 'juantest@yopmail.com');
            expect(response.body.token).to.be.a('string').to.have.length.greaterThan(15)
        })
    });
})