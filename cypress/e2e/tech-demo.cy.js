describe("tech demo auth fallback", () => {
  beforeEach(function tryToVisitProtectedPage() {
    cy.visit("/tech-demo");
  });

  it("redirects to login when not authenticated and login fails in Cypress", () => {
    cy.url().should("include", "/login");

    cy.dataCy("login-button").should("exist");
    cy.dataCy("login-button").click();
  });
});
