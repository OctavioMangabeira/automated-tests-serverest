import { getApiUrl } from "../utils/envHelper";
import { RESPONSE_API } from "../../fixtures/dataUtils"

Cypress.Commands.add('createNewUser', (newUser, options = {}) => {

    const { failOnStatusCode = true } = options

    return cy.request({
        method: 'POST',
        url: getApiUrl('usuarios'),
        body: newUser,
        failOnStatusCode,
        headers: {
            'Content-Type': 'application/json'
        }
    })
})

Cypress.Commands.add('loginUserApi', (email, password) => {
    cy.request({
        method: 'POST',
        url: getApiUrl('login'),
        body: { email, password }
    }).then((res) => {
        expect(res.status).to.eq(200);
        const token = res.body.authorization;
        Cypress.env('token', token);
    })
})

Cypress.Commands.add('getUserById', () => {
    const id = Cypress.env('userId');
    const token = Cypress.env('token');
    cy.request({
        method: 'GET',
        url: getApiUrl(`usuarios/${id}`),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body._id).to.eq(`${id}`);
    })
})

Cypress.Commands.add('deleteUserById', () => {
    cy.then(() => {
        const id = Cypress.env('idUserCreated');
        const token = Cypress.env('token');

        cy.request({
            method: 'DELETE',
            url: getApiUrl(`usuarios/${id}`),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.include(RESPONSE_API.MESSAGE_DELETE_REGISTRATION);
        })
    })
})


