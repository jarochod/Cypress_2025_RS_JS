import { isDesktopViewport } from "../utils/isDesktopViewport";

export class Navigation {
  constructor() {
    this.basketCounter = '[data-qa="header-basket-count"]';
    // desktop – <p class="desktop-nav-link" data-qa="desktop-nav-link"><a href="/basket">Checkout</a></p>
    this.checkoutLink = '[data-qa="desktop-nav-link"]';
    // mobile – <div data-qa="mobile-nav-drawer">…<a href="/basket">Checkout</a>…</div>
    this.checkoutLink_m = '[data-qa="mobile-nav-drawer"]';
    this.burgerButton = ".burger-button";
    this.removeFromBasketButtons = "button"; // szukamy wszystkich buttonów
  }

  getBasketCount() {
    if (isDesktopViewport()) {
      // desktop → licznik w nagłówku
      return cy
        .get(this.basketCounter)
        .should("be.visible")
        .invoke("text")
        .then((text) => parseInt(text.trim(), 10));
    } else {
      // mobile → liczymy przyciski z tekstem "Remove from Basket"
      return cy.get("button").then(($btns) => {
        const count = Cypress.$($btns).filter((i, el) =>
          /remove from basket/i.test(el.innerText)
        ).length;
        return count; // zwykła liczba
      });
    }
  }

  goToCheckout() {
    if (!isDesktopViewport()) {
      // MOBILE: najpierw burger menu
      cy.get(this.burgerButton).should("be.visible").click();
      cy.get(this.checkoutLink_m).contains("Checkout").should("be.visible").click();
    } else {
      // DESKTOP
      cy.get(this.checkoutLink).contains("Checkout").should("be.visible").click();
    }
    cy.url().should("include", "/basket");
  }
}
