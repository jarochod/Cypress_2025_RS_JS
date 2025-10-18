/// <reference types="cypress" />

import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "./page-objects/ProductsPage";
import { Navigation } from "./page-objects/Navigation";
import { Checkout } from "./page-objects/Checkout";
import { LoginPage } from "./page-objects/LoginPage";
import { RegisterPage } from "./page-objects/RegisterPage";
import { DeliveryDetails } from "./page-objects/DeliveryDetails";
import { deliveryDetails as userAddress } from "../fixtures/deliveryDetails";

describe("New user full end-to-end test journey", () => {
  it("should complete the new user journey", () => {
    const productsPage = new ProductsPage();
    const navigation = new Navigation();
    const checkout = new Checkout();
    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();
    const deliveryDetails = new DeliveryDetails();

    const email = `${uuidv4()}@gmail.com`;
    const password = uuidv4();

    // [AKCJA] wejście na stronę
    productsPage.visit();

    // [AKCJA] sortowanie produktów po cenie
    productsPage.sortByCheapest();

    // [ASERCJA] weryfikacja czy produkty są posortowanie po cenie
    productsPage.getProductPrices().as("afterSorting_Prices");
    cy.get("@afterSorting_Prices").then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted); // sprawdzamy, czy lista jest posortowana rosnąco
    });

    // [ASERCJA] początkowo koszyk pusty
    navigation.getBasketCount().should("equal", 0);

    // [AKCJA] dodajemy trzy produkty
    productsPage.addProductToBasket(0);
    productsPage.addProductToBasket(1);
    productsPage.addProductToBasket(2);
    // [ASERCJA] koszyk = 3
    navigation.getBasketCount().should("equal", 3);

    // [AKCJA] przejście do koszyka
    navigation.goToCheckout();

    // [ASERCJA] sprawdzamy URL koszyka
    cy.url().should("include", "/basket");
    // [ASERCJA] liczba elementów w koszyku = 3
    checkout.countItems().should("equal", 3);

    // [AKCJA] usuwamy najtańszy produkt
    checkout.removeCheapestProduct();

    // [ASERCJA] liczba elementów w koszyku = 2
    checkout.countItems().should("equal", 2);
    // [ASERCJA] licznik koszyka = 2
    navigation.getBasketCount().should("equal", 2);

    // [AKCJA] przejście do finalizacji zakupu
    checkout.continueToCheckout();
    // [ASERCJA] sprawdzamy URL
    cy.url().should("match", /\/login\?redirect=.+/);

    // [AKCJA] przejście do rejestracji nowego użytkownika
    loginPage.moveToRegister();
    // [ASERCJA] sprawdzamy URL
    cy.url().should("match", /\/signup\?redirect=.+/);

    // [AKCJA] rejestracja nowego użytkownika
    registerPage.signUpAsNewUser(email, password);

    // [AKCJA]
    deliveryDetails.fillDetails(userAddress);
    deliveryDetails.saveDetails();

    // [ASERCJA] sprawdzamy czy pojawił się nowy zapisany adres i dane są zgodne
    deliveryDetails.getSavedDetails().then((saved) => {
      expect(saved).to.deep.equal(userAddress);
    });

    // [AKCJA] przechodzimy do płatności
    deliveryDetails.continueToPayment();

    // [ASERCJA] sprawdzamy, że trafiliśmy na stronę płatności
    cy.url().should("include", "/payment");

    cy.pause(); // [AKCJA pomocnicza] zatrzymanie testu do podglądu
  });
});
