import { DATA, MSGS, PATHS, WAIT } from "../../config/constants";

describe(`${MSGS.name}.Form.Edit`, () => {
  beforeEach(() => {
    cy.login();
    cy.visit(PATHS.edit + DATA.specifiedMarker.uuid);
  });

  it("Can edit form", () => {
    const date = new Date();
    const title = `Cypress automated title ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    cy.get("input[required]")
      .should("have.length", 1)
      .clear()
      .type(
        title,
      );
    cy.get("textarea")
      .clear()
      .type(
        `Cypress automated description ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
      );

    cy.get('[type="submit"').click();
    cy.wait(WAIT.time * 5);
    cy.get(".anticon-check-circle").should("have.length", 1);
    cy.contains('View Senotype').click()
    cy.wait(WAIT.time);
    cy.contains(title)
  });
});