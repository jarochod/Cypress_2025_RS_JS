/// <reference types="cypress" />

import { ProductsPage } from "./page-objects/ProductsPage";
import { Navigation } from "./page-objects/Navigation";
import { Checkout } from "./page-objects/Checkout";

describe("New user full end-to-end test journey", () => {
  it("should complete the new user journey", () => {
    const productsPage = new ProductsPage();
    const navigation = new Navigation();
    const checkout = new Checkout();

    // GIVEN user is on the products page
    productsPage.visit();

    // THEN basket count should be 0
    navigation.getBasketCount().should("equal", 0);

    // WHEN user adds 3 products to basket
    productsPage.addProductToBasket(0);
    productsPage.addProductToBasket(1);
    productsPage.addProductToBasket(2);

    // THEN basket count should be 3
    navigation.getBasketCount().should("equal", 3);

    // WHEN user goes to checkout
    navigation.goToCheckout();

    // THEN checkout page should be visible
    cy.url().should("include", "/basket");

    // THEN basket should contain 3 items
    checkout.countItems().should("equal", 3);

    // WHEN user removes the cheapest product
    checkout.removeCheapestProduct();

    // THEN basket should contain 2 items
    checkout.countItems().should("equal", 2);

    // AND basket counter in navigation should also update to 2
    navigation.getBasketCount().should("equal", 2);

    cy.pause();
  });
});