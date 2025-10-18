// Funkcja pomocnicza do pobierania tokena logowania
export const getLoginToken = (username, password) => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:2221/api/login',
    body: { "username": username, "password": password },
    failOnStatusCode: false,
  }).then((resp) => {
    if (resp.status !== 200) {
      throw new Error('An error occurred trying to retrieve the login token.');
    }
    return resp.body.token;
  });
};
