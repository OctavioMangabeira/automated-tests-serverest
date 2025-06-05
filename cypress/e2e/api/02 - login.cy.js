/// <reference types ='cypress'/>

import { DATA_NEW_USER, RESPONSE_API } from "../../fixtures/dataUtils"

describe('Login User Tests', () => {

    before(() => {
        cy.createNewUser(DATA_NEW_USER).then((res) => {
            expect(res.status).to.eq(201);
            const id = res.body._id;
            Cypress.env('idUserCreated', id);
        });
    })

    it('Login Successfully', () => {
        cy.loginUserApi(DATA_NEW_USER.email, DATA_NEW_USER.password).then((res) => {
            expect(res.body.message).to.include(RESPONSE_API.MESSAGE_LOGIN_SUCCESSFULLY);
        })
    })

    after(() => {
        cy.deleteUserById();
    })
})