import {MSGS, PATHS, DATA, SEL, WAIT} from "../../config/constants";

describe(`${MSGS.name}.Table.Search`, () => {

    beforeEach(() => {
        cy.login()
        cy.visit(PATHS.search)
    })

    it('Can Search, can search uploads and show respective Dataset', () => {
        const term = DATA.markers;
        cy.search(term);
        
        
        cy.get(".ant-table-row").each(($el, index, $list) => {
          cy.wrap($el)
            .find(".ant-table-cell")
            .eq(0).find('a')
            .should("have.text", `${term}`);
        });

    })
})