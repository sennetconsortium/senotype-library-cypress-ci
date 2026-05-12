import {MSGS, PATHS} from "../../config/constants";

describe(`${MSGS.name}.Table.Download`, () => {

    beforeEach(() => {
        cy.login()
        cy.visit(PATHS.search)
    })

    it('Downloads CSV file', () => {
        const date = new Date()
        cy.download(
          `senotypes-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.csv`,
        );
    })
})