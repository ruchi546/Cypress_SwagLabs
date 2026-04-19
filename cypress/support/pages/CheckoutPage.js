class CheckoutPage {
  firstNameInput = '[data-test="firstName"]';
  lastNameInput = '[data-test="lastName"]';
  postalCodeInput = '[data-test="postalCode"]';
  continueButton = '[data-test="continue"]';
  cancelButton = '[data-test="cancel"]';
  finishButton = '[data-test="finish"]';
  errorMessage = '[data-test="error"]';
  inventoryItemName = '[data-test="inventory-item-name"]';
  completeHeader = '[data-test="complete-header"]';
  backToProductsButton = '[data-test="back-to-products"]';

  navigateToCheckoutStep1() {
    cy.url().should('include', '/checkout-step-one.html');
  }

  navigateToCheckoutStep2() {
    cy.url().should('include', '/checkout-step-two.html');
  }

  navigateToCheckoutComplete() {
    cy.url().should('include', '/checkout-complete.html');
  }

  fillFirstName(firstName) {
    cy.get(this.firstNameInput).type(firstName);
  }

  fillLastName(lastName) {
    cy.get(this.lastNameInput).type(lastName);
  }

  fillPostalCode(postalCode) {
    cy.get(this.postalCodeInput).type(postalCode);
  }

  clickContinue() {
    cy.get(this.continueButton).should('be.visible').and('contain', 'Continue').click();
  }

  clickCancel() {
    cy.get(this.cancelButton).should('be.visible').and('contain', 'Cancel').click();
  }

  clickFinish() {
    cy.get(this.finishButton).should('be.visible').and('contain', 'Finish').click();
  }

  clickBackHome() {
    cy.get(this.backToProductsButton).should('be.visible').and('contain', 'Back Home').click();
  }

  fillCheckoutInfo(firstName, lastName, postalCode) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillPostalCode(postalCode);
  }

  verifyErrorMessage(message) {
    cy.get(this.errorMessage).should('be.visible').and('contain', message);
  }

  verifyItemInCheckout(itemName) {
    cy.get(this.inventoryItemName).should('contain', itemName);
  }

  verifyCheckoutComplete() {
    cy.get(this.completeHeader).should('contain', 'Thank you for your order');
  }
}

export default new CheckoutPage();