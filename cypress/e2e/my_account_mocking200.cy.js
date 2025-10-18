import { MyAccountPage } from "./page-objects/MyAccountPage";
import { getLoginTokenAndSetCookie } from "./api-calls/getLoginTokenAndSetCookie";
import { adminDetails } from "../fixtures/userDetails";

describe("My Account using cookie injection and mocking network request", () => {
  it("logs in via token cookie and shows My Account page (mocked success fixture)", () => {
    // 1. Mock /api/user zwracający poprawnego usera
    cy.intercept(
      'GET',
      '**/api/user**',
      {
        statusCode: 200,
        fixture: 'user-success.json'
      }
    ).as('mockUser');

    // 2. Ustaw cookie (token) przez helpera
    getLoginTokenAndSetCookie(adminDetails.username, adminDetails.password);

    // 3. Odwiedź stronę
    const myAccount = new MyAccountPage();
    myAccount.visit();

    // 4. Poczekaj na mockowany request
    cy.wait('@mockUser');

    // 5. Sprawdź reakcję aplikacji (happy path)
    myAccount.waitForPageHeading();
    cy.contains("Email: admin").should("be.visible"); // np. sprawdzenie czy jest zalogowany admin
    cy.contains("User ID: e2db03c0-029d-4b3b-9ee0").should("be.visible"); // np. sprawdzenie czy jest User ID
  });
});
