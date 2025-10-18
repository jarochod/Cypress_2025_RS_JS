export class RegisterPage {
  constructor() {
    // selektory – w Cypress zwykle trzymamy jako stringi
    this.emailInput = 'input[placeholder="E-Mail"]';
    this.passwordInput = 'input[placeholder="Password"]';
    this.registerButton = 'button:contains("Register")';
    // 👆 albo lepiej: '[data-qa="register"]' jeśli w HTML są atrybuty testowe
  }

  signUpAsNewUser(email, password) {
    cy.get(this.emailInput).should("be.visible").type(email);

    cy.get(this.passwordInput).should("be.visible").type(password);

    cy.get(this.registerButton).should("be.enabled").click();
  }
}
