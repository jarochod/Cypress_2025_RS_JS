export class MyAccountPage {
  constructor() {
    this.errorMessage = '[data-qa="error-message"]';
  }

  visit() {
    // używa baseUrl jeśli jest ustawione w konfiguracji Cypress
    cy.visit("/my-account");
    cy.url().should("include", "/my-account");
  }

  waitForPageHeading() {
    // dopasuj selektor do Twojego markup'u (tu założyłem <h1>My Account</h1>)
    cy.contains("h1", "My Account").should("be.visible");
  }

  waitForErrorMessage() {
    cy.get(this.errorMessage)
      .should("be.visible")
      .should("contain.text", "CYPRESS ERROR FROM MOCKING");
  }
}
