import { MyAccountPage } from "./page-objects/MyAccountPage";
import { getLoginToken } from "./api-calls/getLoginToken";
import { adminDetails } from "../fixtures/userDetails";

describe("My Account using cookie injection", () => {
  it("logs in via token cookie and shows My Account page", () => {
    getLoginToken(adminDetails.username, adminDetails.password).then((loginToken) => {
      expect(loginToken).to.be.a("string").and.not.be.empty;
      cy.setCookie("token", loginToken, { path: "/" });
    });

    const myAccount = new MyAccountPage();
    myAccount.visit();
    myAccount.waitForPageHeading();
  });
});
