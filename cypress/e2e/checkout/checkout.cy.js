import CheckoutPage from '../../support/pages/CheckoutPage';
import CartPage from '../../support/pages/CartPage';
import InventoryPage from '../../support/pages/InventoryPage';

describe("Checkout", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginAsStandardUser();
    InventoryPage.navigateTo();
    cy.addItemToCartByName("Sauce Labs Backpack");
    InventoryPage.clickShoppingCart();
    CartPage.navigateTo();
    CartPage.clickCheckout();
    CheckoutPage.navigateToCheckoutStep1();
  });

  it("validates required first name", () => {
    CheckoutPage.clickContinue();
    CheckoutPage.verifyErrorMessage("Error: First Name is required");
  });

  it("validates required last name", () => {
    CheckoutPage.fillFirstName("Joe");
    CheckoutPage.clickContinue();
    CheckoutPage.verifyErrorMessage("Error: Last Name is required");
  });

  it("validates required postal code", () => {
    CheckoutPage.fillFirstName("Jane");
    CheckoutPage.fillLastName("Doe");
    CheckoutPage.clickContinue();
    CheckoutPage.verifyErrorMessage("Error: Postal Code is required");
  });

  it("cancels checkout and returns to cart", () => {
    CheckoutPage.clickCancel();
    CartPage.navigateTo();
  });

  it("completes checkout successfully", () => {
    CheckoutPage.fillCheckoutInfo("Jane", "Doe", "00000");
    CheckoutPage.clickContinue();
    CheckoutPage.navigateToCheckoutStep2();
    CheckoutPage.verifyItemInCheckout("Sauce Labs Backpack");
    CheckoutPage.clickFinish();
    CheckoutPage.navigateToCheckoutComplete();
    CheckoutPage.verifyCheckoutComplete();
    CheckoutPage.clickBackHome();
    InventoryPage.navigateTo();
  });
});