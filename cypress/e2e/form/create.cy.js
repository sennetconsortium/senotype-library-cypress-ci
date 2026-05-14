import { MSGS, PATHS, WAIT } from "../../config/constants";

describe(`${MSGS.name}.Form.Create`, () => {
  beforeEach(() => {
    cy.login();
    cy.visit(PATHS.create);
  });

  it("Can submit form with validation", () => {
    const date = new Date()
    cy.get('[type="submit"').click();
    cy.get(".form-control:invalid, .is-invalid").should("have.length", 7);
    cy.get("input[required]")
      .should("have.length", 1)
      .type(
        `Cypress automated title ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
      );
    cy.get("textarea").type(
      `Cypress automated description ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
    );

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
    });

    cy.get('[type="submit"').click();
    cy.wait(WAIT.time * 5);
    cy.get(".anticon-check-circle").should('have.length', 1);
  });

  it("Can fill out valuesets", () => {
    ["assay", "inducer", "microenvironment"].map((i) => {
      cy.selectFromValueset(i)
    });
    cy.get("#senotypeForm--Tab-tab-citationDemographics").click();
    cy.selectFromValueset("sex");
  });

  it("Can fill out external search", () => {
    cy.searchForValueset("diagnosis", "9351");
    cy.get("#senotypeForm--Tab-tab-citationDemographics").click();
    [
      ["citation", "41705430"],
      ["origin", "AB_1598149"],
      ["dataset", "SNT879.QPWV.354"],
    ].map((i) => {
      cy.searchForValueset(i[0], i[1]);
    });

  });

  it("Can fill out input groups", () => {
    cy.get("#senotypeForm--Tab-tab-citationDemographics").click();
    [['age', [10, 15, 25]], ['bmi', [40, 60, 90]]].map((i) => {
      cy.inputGroup(i[0], i[1])
    });
  });

  it("Can upload markers", () => {
    cy.get("#senotypeForm--Tab-tab-markers").click();
    [
      ["specified_marker_set", "1100"],
      ["regulated_marker_set", "10970"],
    ].map((i) => {
      cy.searchForValueset(i[0], i[1]);
    });

    ["specified", "regulated"].map((i) => {
      cy.get(`#c-markerForm--${i} input[type=file]`).selectFile(
        `cypress/fixtures/markers-example-${i}.csv`,
        {
          force: true,
        },
      );
    });

    
  });
});
