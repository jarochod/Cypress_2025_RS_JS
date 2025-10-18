export class Checkout {
  constructor() {
    this.basketCards = '[data-qa="basket-card"]';
    this.basketItemPrice = '[data-qa="basket-item-price"]';
    this.basketItemRemoveButton = '[data-qa="basket-card-remove-item"]';
    this.continueToCheckoutButton = '[data-qa="continue-to-checkout"]';
  }

  countItems() {
    return cy.get(this.basketCards).its("length");
  }

  removeCheapestProduct() {
    cy.get(this.basketItemPrice).then(($elements) => {
      // Utworzenie tablicy cen w formie liczb
      const prices = [...$elements].map((element) =>
        parseInt(element.innerText.replace("$", ""), 10)
      );

      // Znalezienie najmniejszej ceny
      const minPrice = Math.min(...prices);

      // Znalezienie i kliknięcie przycisku "Usuń"
      cy.get(this.basketItemRemoveButton).eq(prices.indexOf(minPrice)).click();
    });
  }

  continueToCheckout() {
    cy.get(this.continueToCheckoutButton).should("be.visible").click();

    // cy.url().should("match", /\/login\?redirect=.+/); // [ASERCJA] dlatego przenoszę do głównego pliku
  }
}
