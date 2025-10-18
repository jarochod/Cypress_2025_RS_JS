/// <reference types="cypress" />

describe("Product Page Add to Basket", () => {
  it("should add product to basket and go to checkout", () => {
    // Otwórz stronę główną
    cy.visit("/");

    // Lokatory
    const addToBasketButton = '[data-qa="product-button"]';
    const basketCounter = '[data-qa="header-basket-count"]';
    const checkoutLink = '[data-qa="desktop-nav-link"]';

    // Sprawdzenie stanu początkowego
    cy.get(addToBasketButton)
      .first()
      .should("be.visible")
      .and("have.text", "Add to Basket");
    cy.get(basketCounter).should("have.text", "0");

    // Kliknięcie przycisku dodania do koszyka
    cy.get(addToBasketButton).first().click();

    // Sprawdzenie zmiany tekstu przycisku i licznika koszyka
    cy.get(addToBasketButton).first().should("have.text", "Remove from Basket");
    cy.get(basketCounter).should("have.text", "1");

    // Przejście do strony koszyka
    cy.get(checkoutLink).contains("Checkout").click();

    // Weryfikacja adresu URL
    cy.url().should("include", "/basket");
  });
});
