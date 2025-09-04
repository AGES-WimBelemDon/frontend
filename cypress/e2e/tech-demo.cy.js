describe("tech demo test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.dataCy("tech-demo-nav-link").click();
  });

  it("navigates to the tech demo page", () => {
    cy.url().should("include", "/tech-demo");
  });

  it("renders the title", () => {
    cy.dataCy("tech-demo-title").should("have.text", "Tech Demo");
  });

  it("renders button to show API info", () => {
    cy.dataCy("tech-demo-show-api-info-button").should("exist");
  });

  it("navigates when clicking show API info button", () => {
    cy.dataCy("tech-demo-show-api-info-button").click();
    cy.url().should("include", "/2?c2=4");
  });
});

describe("tech demo API info", () => {
  beforeEach(() => {
    cy.interceptOrMock("getTechDemo", "GET", "**/repos/tanstack/query", "tech-demo.json");

    cy.visit("/tech-demo");
    cy.dataCy("tech-demo-show-api-info-button").click();
  });

  it("fetches and displays API info", () => {
    cy.wait("@getTechDemo", { timeout: 10_000 });
    cy.dataCy("tech-demo-api-full-name").should("have.text", "TanStack/query");
    cy.dataCy("tech-demo-api-description").should("include.text", "🤖 Powerful asynchronous state management, server-state utilities and data fetching for the web. TS/JS, React Query, Solid Query, Svelte Query and Vue Query.");
    cy.dataCy("tech-demo-api-subscribers-count").should("include.text", "214");
    cy.dataCy("tech-demo-api-stargazers-count").should("include.text", "46314");
    cy.dataCy("tech-demo-api-forks-count").should("include.text", "3410");
  });
});
