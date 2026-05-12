import {MSGS, PATHS, SEL, WAIT} from "../../config/constants";

describe(`${MSGS.name}.Table.Filter`, () => {

    beforeEach(() => {
        cy.login()
        cy.visit(PATHS.search)
    })

    it('Can filter', () => {
        //cy.appFilter( 'Status', 'New')

        cy.get('.c-badge').each(($el, index, $list) => {
            $el.hasClass('.c-badge--new')
        })

    })
})