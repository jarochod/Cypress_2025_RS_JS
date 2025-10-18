import { getLoginToken } from "./getLoginToken";

export const getLoginTokenAndSetCookie = (username, password) => {
  getLoginToken(username, password).then((loginToken) => {
    expect(loginToken).to.be.a("string").and.not.be.empty;
    cy.setCookie("token", loginToken, { path: "/" });
  });
};
