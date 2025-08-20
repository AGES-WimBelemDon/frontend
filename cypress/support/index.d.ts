/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        dataCy(selector: string): Chainable<JQuery<HTMLElement>>
        interceptOrMock(name: string, method: string, path: string, fixture: string): Chainable<void>
    }
}
