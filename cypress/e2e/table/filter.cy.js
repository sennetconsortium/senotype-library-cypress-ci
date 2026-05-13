import {MSGS, PATHS, SEL, WAIT} from "../../config/constants";

describe(`${MSGS.name}.Table.Facets`, () => {

    beforeEach(() => {
        cy.login()
        cy.visit(PATHS.search)
    })

    it('Can filter with facet', () => {
        cy.get(".sui-facet__title--DatasetType").click();
        cy.get("#sui-facet--DatasetType-CellDIVE").click();
        cy.wait(WAIT.time);
        cy.get(".ant-table-row").each(($el, index, $list) => {
          cy.wrap($el)
            .find(".ant-table-cell")
            .eq(6)
            .should("have.text", "Cell DIVE");
        });
        cy.get(".sui-chipToggle--assay-CellDIVE").should("have.length", 1);

    })
})