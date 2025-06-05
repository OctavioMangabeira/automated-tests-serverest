/// <reference types ='cypress'/>

import { createFakeUser } from "../../support/utils/fakerUtils";
import { DATA_NEW_USER, RESPONSE_API } from "../../fixtures/dataUtils";

describe('Register User Tests', () => {

    before(() => {

        cy.createNewUser(DATA_NEW_USER).then((res) => {
            expect(res.status).to.eq(201);
            const id = res.body._id;
            Cypress.env('idUserCreated', id);
        });
    });

    it('Register user successfully', () => {
        const newUser = createFakeUser();

        cy.createNewUser(newUser).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.include(RESPONSE_API.MESSAGE_REGISTRATION_SUCCESSFULLY);
        });
    })

    it('Register user with duplicate email', () => {
        cy.createNewUser(DATA_NEW_USER, { failOnStatusCode: false }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.include(RESPONSE_API.MESSAGE_REGISTRATION_DUPLICATE_EMAIL);
        })
    })

    after(() => {
        cy.deleteUserById();
    })

})