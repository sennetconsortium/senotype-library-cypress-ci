// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import './auth'
import {SEL, WAIT} from "../config/constants";

Cypress.Commands.add('interceptProtocols', () => {
    // Intercept the jsonp requests to protocols made that triggers 'unexpected' while running in cypress
    const randomJsonForNoError = 'https://ingest-board.dev.sennetconsortium.org/content/banners/index.json'
    cy.intercept('google-analytics.com*', (req) => {
        req.url = randomJsonForNoError
    })
})

Cypress.Commands.add('search', (keyword) => {
    cy.get("#query").as("searchBox").clear();
    cy.get("@searchBox").type(`${keyword}{enter}`, { force: true });
    cy.wait(WAIT.time * 2);
})

Cypress.Commands.add("selectFromValueset", (id) => {
  cy.get(`#c-inputField--${id} .ant-select`).click({ force: true });
  cy.get(`.c-inputField__selectDropdown--${id} .ant-select-item-option`)
    .eq(0)
    .should("be.visible")
    .click({ force: true });
  cy.get("body").type("{esc}");
});

Cypress.Commands.add("searchForValueset", (id, term) => {
  cy.get(`#c-inputField--${id} .ant-select`).click({ force: true });
  cy.get(`[id="${id}"]`).as("input");
  cy.get("@input").type(`${term}{enter}`);
  cy.get(`.c-inputField__selectDropdown--${id} .ant-select-item-option`)
    .eq(0)
    .should("be.visible")
    .click({ force: true });
  cy.get("body").type("{esc}");
});

Cypress.Commands.add("inputGroup", (id, values) => {
  cy.get(
    `#c-formInputGroup--${id} .input-group .form-control:not([disabled])`,
  ).each(($el, index, $list) => {
    cy.wrap($el)
      .clear()
      .type(`${values[index]}{enter}`);
  });
});

Cypress.Commands.add(
  "download",
  (filename, sel = ".c-searchResults__export .btn") => {
    cy.get(sel).click();
    cy.wait(WAIT.time * 2);
    cy.readFile(`cypress/downloads/${filename}`).should("exist");
  },
);

