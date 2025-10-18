/// <reference types="cypress" />

export class PaymentPage {
  constructor() {
    this.discountIframe = '[data-qa="active-discount-container"]';
    this.discountCodeInside = '[data-qa="discount-code"]';

    this.discountInput = 'input[placeholder="Discount code"]';
    this.activateDiscountButton = '[data-qa="submit-discount-button"]';

    this.totalValue = '[data-qa="total-value"]';
    this.discountedValue = '[data-qa="total-with-discount-value"]';
    this.discountActiveMessage = '[data-qa="discount-active-message"]';

    this.creditCardOwnerInput = 'input[placeholder="Credit card owner"]';
    this.creditCardNumberInput = 'input[placeholder="Credit card number"]';
    this.creditCardValidUntilInput = 'input[placeholder="Valid until"]';
    this.creditCardCvcInput = 'input[placeholder="Credit card CVC"]';

    this.payButton = '[data-qa="pay-button"]';
  }

  // helper: zwraca body iframe (SAME-ORIGIN)
  getIframeBody(selector) {
    return cy
      .get(selector)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap);
  }

  // pobranie kodu rabatowego z iframe
  getActivateDiscount() {
    return this.getIframeBody(this.discountIframe)
      .find(this.discountCodeInside)
      .invoke('text')
      .then((code) => (code || '').trim());
  }

  // aktywacja kodu rabatowego (bez walidacji kwot)
  activateDiscount() {
    this.getActivateDiscount().then((code) => {
      cy.get(this.discountInput).clear().type(code, { delay: 600 })
        .should('have.value', code);

      cy.get(this.discountActiveMessage).should('not.exist');
      cy.get(this.discountedValue).should('not.exist');

      cy.get(this.activateDiscountButton).click();

      cy.get(this.discountActiveMessage).should('be.visible');
      cy.get(this.discountedValue).should('be.visible');
    });
  }


  // 🔹metoda – zwraca słownik { totalValue, discountedValue }
  getValuesAfterActivateDiscount() {
    return cy.get(this.totalValue).invoke('text').then((totalText) => {
      const totalValue = parseInt(totalText.replace('$', ''), 10);

      return cy.get(this.discountedValue).invoke('text').then((discountedText) => {
        const discountedValue = parseInt(discountedText.replace('$', ''), 10);

        return { totalValue, discountedValue };
      });
    });
  }

  fillPaymentDetails(paymentDetails) {
    cy.get(this.creditCardOwnerInput).clear().type(paymentDetails.owner);
    cy.get(this.creditCardNumberInput).clear().type(paymentDetails.number);
    cy.get(this.creditCardValidUntilInput).clear().type(paymentDetails.validUntil);
    cy.get(this.creditCardCvcInput).clear().type(paymentDetails.cvc);
  }

  completePayment() {
    cy.get(this.payButton).click();
    cy.url().should('include', '/thank-you');
  }
}