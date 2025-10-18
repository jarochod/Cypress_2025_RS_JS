export class ProductsPage {
  constructor() {
    this.addButtons = '[data-qa="product-button"]';
    this.productTitle = '[data-qa="product-title"]';
    this.productPrice = '[datatype="product-price"]';
    this.sortDropdown = '[data-qa="sort-dropdown"]';
  }

  visit() {
    cy.visit("/");
  }

  getProductTitles() {
    return cy.get(this.productTitle).then(($elements) => {
      const titles = Cypress._.map($elements, "innerText");
      return cy.wrap(titles);
    });
  }

  getProductPrices() {
    return cy.get(this.productPrice).then(($elements) => {
      const prices = [...$elements].map((el) =>
        parseFloat(el.innerText.replace(/[^0-9.,]/g, "").replace(",", "."))
      );
      return cy.wrap(prices);
    });
  }

  sortByCheapest() {
    cy.get(this.sortDropdown).select("price-asc");
  }

  sortNumbers(numbers) {
    return [...numbers].sort((a, b) => a - b);
  }

  addProductToBasket(index) {
    cy.get(this.addButtons)
      .eq(index)
      .should("be.visible")
      .should("have.text", "Add to Basket")
      .click()
      .should("have.text", "Remove from Basket");
  }
}
