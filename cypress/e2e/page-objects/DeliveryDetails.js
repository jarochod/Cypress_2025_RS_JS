export class DeliveryDetails {
  firstNameInput = '[data-qa="delivery-first-name"]';
  lastNameInput = '[data-qa="delivery-last-name"]';
  streetInput = '[data-qa="delivery-address-street"]';
  postCodeInput = '[data-qa="delivery-postcode"]';
  cityInput = '[data-qa="delivery-city"]';
  countryDropdown = '[data-qa="country-dropdown"]';

  saveAddressButton = 'button:contains("Save address for next time")';
  savedAddressContainer = '[data-qa="saved-address-container"]';

  savedAddressFirstName = '[data-qa="saved-address-firstName"]';
  savedAddressLastName = '[data-qa="saved-address-lastName"]';
  savedAddressStreet = '[data-qa="saved-address-street"]';
  savedAddressPostcode = '[data-qa="saved-address-postcode"]';
  savedAddressCity = '[data-qa="saved-address-city"]';
  savedAddressCountry = '[data-qa="saved-address-country"]';

  continueToPaymentButton = 'button:contains("Continue to payment")';

  fillDetails(userAddress) {
    cy.get(this.firstNameInput).clear().type(userAddress.firstName);
    cy.get(this.lastNameInput).clear().type(userAddress.lastName);
    cy.get(this.streetInput).clear().type(userAddress.street);
    cy.get(this.postCodeInput).clear().type(userAddress.postcode);
    cy.get(this.cityInput).clear().type(userAddress.city);
    cy.get(this.countryDropdown).select(userAddress.country);
  }

  saveDetails() {
    cy.get(this.saveAddressButton).click();
  }

  getSavedDetails() {
    return cy.get(this.savedAddressContainer).first().then(($container) => {
      return {
        firstName: $container.find(this.savedAddressFirstName).text(),
        lastName: $container.find(this.savedAddressLastName).text(),
        street: $container.find(this.savedAddressStreet).text(),
        postcode: $container.find(this.savedAddressPostcode).text(),
        city: $container.find(this.savedAddressCity).text(),
        country: $container.find(this.savedAddressCountry).text(),
      };
    });
  }

  continueToPayment() {
    cy.get(this.continueToPaymentButton).click();
  }
}
