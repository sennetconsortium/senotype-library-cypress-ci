import { MSGS, PATHS, WAIT } from "../../config/constants";

describe(`${MSGS.name}.Form.Create`, () => {
  beforeEach(() => {
    cy.login();
    cy.visit(PATHS.create);
  });

  it("Fails if not enter mandatory", () => {
    cy.get('[type="submit"').click();
    cy.get(".form-control:invalid, .is-invalid").should('have.length', 7);
    cy.get("input[required]").should("have.length", 1).type('Cypress automated title');
    cy.get("textarea").type('Cypress automated description');

    //cy.get(`#c-inputField--cell_type .ant-select`).click();
    cy.get('[id="cell_type"]').as("cellType");
    cy.get("@cellType").type("hair{enter}");
    cy.wait(WAIT.time);
    cy.get(".ant-select-item-option").eq(0).click({ force: true });

    [
      ["hallmark", "Resistance to apoptosis"],
      ["taxon", "human"],
      ["organ", "Bone"],
    ].map((i) => {
      cy.get(`[id="${i[0]}"]`).type(`${i[1]}{enter}`);
      cy.get("body").type("{esc}");
      cy.wait(WAIT.time);
      //cy.get("input[required]").focus().blur();
    });
    cy.get('[type="submit"').click();
    cy.wait(WAIT.time * 5);
    cy.get(".anticon-check-circle").should('have.length', 1);
  });
});
