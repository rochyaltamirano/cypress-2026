const cookie = Cypress.env('cookie')
describe('Request a los pedidos por API', () => {
   
    it('Obtener todas ordenes de un usuario', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.laboratoriodetesting.com/api/v1/orders',
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));

            expect(response.body).to.have.property('orders');
            response.body.orders.forEach((order) => {
                expect(order).to.have.property('id')
                expect(order).to.have.property('userId')
                expect(order).to.have.property('createdAt')
                expect(order).to.have.property('products')
                expect(order).to.have.property('total')
            })
        })
    });

    it('Obtener una orden específica de un usuario', () => {
        const orderId = '2d486c45-65a6-4c3c-9920-68252962a0f3'
        cy.request({
            method: 'GET',
            url: `https://api.laboratoriodetesting.com/api/v1/orders/${orderId}`,
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
            expect(response.body).to.have.property('id', orderId);
            expect(response.body).to.have.property('products', '4');
            expect(response.body).to.have.property('total', 6500);


        })
    });
})