import { MyAccountPage } from "./page-objects/MyAccountPage";
import { getLoginTokenAndSetCookie } from "./api-calls/getLoginTokenAndSetCookie";
import { adminDetails } from "../fixtures/userDetails";

describe("My Account using cookie injection", () => {
  it("logs in via token cookie and shows My Account page", () => {
    getLoginTokenAndSetCookie(adminDetails.username, adminDetails.password)
    const myAccount = new MyAccountPage();
    myAccount.visit();
    myAccount.waitForPageHeading();
  });
});
