import CartPage from '../../support/pages/CartPage';
import InventoryPage from '../../support/pages/InventoryPage';

describe("Cart", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginAsStandardUser();
  });

  it("adds items and shows accurate cart badge", () => {
    cy.addItemToCartByName("Sauce Labs Backpack");
    cy.addItemToCartByName("Sauce Labs Fleece Jacket");
    InventoryPage.verifyCartBadge("2");
  });

  it("shows cart contents and supports remove", () => {
    cy.addItemToCartByName("Sauce Labs Fleece Jacket");
    InventoryPage.verifyCartBadge("1");
    InventoryPage.clickShoppingCart();
    CartPage.navigateTo();
    CartPage.verifyItemInCart("Sauce Labs Fleece Jacket");
    CartPage.removeItemByName("Sauce Labs Fleece Jacket");
    CartPage.verifyItemNotInCart("Sauce Labs Fleece Jacket");
  });

  it("keeps selected item after continue shopping", () => {
    cy.addItemToCartByName("Sauce Labs Fleece Jacket");
    InventoryPage.verifyCartBadge("1");
    InventoryPage.clickShoppingCart();
    CartPage.navigateTo();
    CartPage.clickContinueShopping();
    InventoryPage.navigateTo();
    InventoryPage.verifyCartBadge("1");
  });

  it("cart number updates when item is removed from cart", () => {
    cy.addItemToCartByName("Sauce Labs Fleece Jacket");
    InventoryPage.verifyCartBadge("1");
    InventoryPage.clickShoppingCart();
    CartPage.navigateTo();
    CartPage.removeItemByName("Sauce Labs Fleece Jacket");
    CartPage.verifyCartBadgeNotExists();
  });

  it("cart number updates when item is removed from inventory", () => {
    cy.addItemToCartByName("Sauce Labs Fleece Jacket");
    InventoryPage.verifyCartBadge("1");
    InventoryPage.removeItemByName("Sauce Labs Fleece Jacket");
    CartPage.verifyCartBadgeNotExists();
  });
});