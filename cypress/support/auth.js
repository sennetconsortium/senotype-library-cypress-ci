import {AUTH} from "../config/auth";
import {PATHS} from "../config/constants";

Cypress.Commands.add('loginProcess', (msg) => {
    cy.contains('Log in with your institution credentials').click()
    cy.origin('auth.globus.org',  { args: { AUTH } }, ({ AUTH }) => {
        // Use Globus
        cy.contains('Globus ID to sign in').click()
    })

    cy.origin('www.globusid.org', { args: { AUTH } }, ({ AUTH })  => {
        cy.get('input[name="username"]').type(AUTH.user)
        cy.get('input[name="password"]').type(AUTH.password)
        cy.get('button[type="submit"]').click()
    })
})

Cypress.Commands.add('login', (options = { }, name = 'pitt') => {
    cy.viewport('macbook-13')
    if (AUTH.token) {
        const j = {
            name: AUTH.displayName,
            email: AUTH.displayName,
            groups_token: AUTH.token,
            read_privs: true
        }
        cy.setCookie('info', btoa(JSON.stringify(j)))
        cy.setCookie('isAuthenticated', 'true', {domain: 'ingest-board.dev.sennetconsortium.org'})

        // cy.wait(1000)
        cy.reload()
        //cy.contains(AUTH.displayName)
    }
})