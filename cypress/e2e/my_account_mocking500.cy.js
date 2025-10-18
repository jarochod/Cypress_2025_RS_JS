import { MyAccountPage } from "./page-objects/MyAccountPage";
import { getLoginTokenAndSetCookie } from "./api-calls/getLoginTokenAndSetCookie";
import { adminDetails } from "../fixtures/userDetails";

describe("My Account using cookie injection and mocking network request", () => {
  it("logs in via token cookie and shows error from mocked /api/user (fixture)", () => {
    // 1. Mock request do /api/user przy użyciu fixture
    cy.intercept(
      'GET',
      '**/api/user**',
      {
        statusCode: 500,
        fixture: 'user-error.json' // <-- zamiast body w kodzie
      }
    ).as('mockUser');

    // 2. Ustawienie ciasteczka przez helpera
    getLoginTokenAndSetCookie(adminDetails.username, adminDetails.password);

    // 3. Wejście na stronę
    const myAccount = new MyAccountPage();
    myAccount.visit();

    // 4. Poczekaj na mockowany request
    cy.wait('@mockUser');

    // 5. Sprawdź reakcję aplikacji
    myAccount.waitForPageHeading();
    myAccount.waitForErrorMessage(); 
  });
});