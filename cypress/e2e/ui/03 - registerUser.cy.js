/// <reference types ='cypress'/>

import { DATA_NEW_USER, USER_REGISTRATION_NOTICES } from "../../fixtures/dataUtils";
import { createFakeUser } from "../../support/utils/fakerUtils";
import { ELEMENTS_REGISTER_USER_PAGE } from "../../support/pages/registerUser/elements";
import { getApiUrl } from "../../support/utils/envHelper";

describe('Register User Tests', () => {

    before(() => {
        cy.createNewUser(DATA_NEW_USER).then((res) => {
            expect(res.status).to.eq(201);
            const id = res.body._id;
            Cypress.env('idUserCreated', id);
        });
    })

    beforeEach(() => {
        cy.loginUserUi(DATA_NEW_USER.email, DATA_NEW_USER.password);
        cy.clickButtonRegisterUser();
    });

    it('Register user successfully', () => {
        const dataNewUser = createFakeUser();

        cy.fillAndSubmitFormRegisterUser({
            name: dataNewUser.nome,
            email: dataNewUser.email,
            password: dataNewUser.password
        });

        cy.intercept('POST', getApiUrl('usuarios')).as('createNewUSer');

        cy.wait('@createNewUSer').then((intercept) => {
            const id = intercept.response.body._id;
            Cypress.env('userId', id);
        })

        cy.getUserById();

    })

    it('Register user with the same data', () => {
        cy.fillAndSubmitFormRegisterUser({
            name: DATA_NEW_USER.nome,
            email: DATA_NEW_USER.email,
            password: DATA_NEW_USER.password
        });
        cy.get(ELEMENTS_REGISTER_USER_PAGE.divAlert).within(() => {
            cy.get('span').should('contain', USER_REGISTRATION_NOTICES.MESSAGE_EMAIL_ALREADY_USE);
        })
    })

    it('Register user without name', () => {
        cy.fillAndSubmitFormRegisterUser({
            undefined,
            email: DATA_NEW_USER.email,
            password: DATA_NEW_USER.password
        });
        cy.get(ELEMENTS_REGISTER_USER_PAGE.divAlert).within(() => {
            cy.get('span').should('contain', USER_REGISTRATION_NOTICES.MESSAGE_NAME_IS_REQUIRED);
        })
    })

    after(() => {
        cy.deleteUserById();
    })
})