export class LoginPage {
  constructor() {
    this.moveToRegisterButton = '[data-qa="go-to-signup-button"]';
  }

  moveToRegister() {
    cy.get(this.moveToRegisterButton).should("be.visible").click();

    // cy.url().should("match", /\/signup\?redirect=.+/) [ASERCJA] dlatego przenoszę do głównego pliku
  }
}
