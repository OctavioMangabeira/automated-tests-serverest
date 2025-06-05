import { ELEMENTS_LOGIN_UI } from "../pages/login/elements";
import { ELEMENTS_HOME } from "../pages/home/elements";
import { ELEMENTS_REGISTER_USER_PAGE } from "../pages/registerUser/elements"

Cypress.Commands.add('loginUserUi', (email, password) => {
    cy.visit('/');
    cy.get(ELEMENTS_LOGIN_UI.inputEmail).type(email);
    cy.get(ELEMENTS_LOGIN_UI.inputPassWord).type(password);
    cy.get(ELEMENTS_LOGIN_UI.buttonEnter).click();
    cy.get(ELEMENTS_HOME.aHome).should('be.visible').and('have.text', 'Home');
})

Cypress.Commands.add('clickButtonRegisterUser', () => {
    cy.get(ELEMENTS_HOME.aRegisterUSer).click();
})

Cypress.Commands.add('fillAndSubmitFormRegisterUser', ({name, email, password}) => {
    if(name) {
        cy.get(ELEMENTS_REGISTER_USER_PAGE.inputNameUser).type(name);
    }
    if(email) {
        cy.get(ELEMENTS_REGISTER_USER_PAGE.inputEmailUser).type(email);
    }
    if(password) {
        cy.get(ELEMENTS_REGISTER_USER_PAGE.inputPasswordUser).type(password);
    }
    cy.get(ELEMENTS_REGISTER_USER_PAGE.inputAdministrator).check();
    cy.get(ELEMENTS_REGISTER_USER_PAGE.buttonRegister).click();
})
