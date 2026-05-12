const AUTH = {
    user: Cypress.env('username'),
    password: Cypress.env('password'),
    displayName: Cypress.env('displayName'),
    token: Cypress.env('token')
}

export { AUTH }