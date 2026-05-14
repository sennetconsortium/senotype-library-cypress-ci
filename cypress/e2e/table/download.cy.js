import {MSGS, PATHS, DATA} from "../../config/constants";

describe(`${MSGS.name}.Table.Download`, () => {

    beforeEach(() => {
        cy.login()
        cy.visit(PATHS.search)
    })

    it('Downloads CSV file', () => {
        const date = DATA.getDate();
        cy.download(
          `senotypes-${date}.csv`,
        );
    })
})