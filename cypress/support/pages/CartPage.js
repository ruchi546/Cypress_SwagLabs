class CartPage {
  cartList = '[data-test="cart-list"]';
  inventoryItemName = '[data-test="inventory-item-name"]';
  removeButton = '[data-test*="remove-"]';
  continueShoppingButton = '[data-test="continue-shopping"]';
  checkoutButton = '[data-test="checkout"]';
  shoppingCartBadge = '[data-test="shopping-cart-badge"]';

  navigateTo() {
    cy.url().should('include', '/cart.html');
  }

  clickContinueShopping() {
    cy.contains(this.continueShoppingButton, 'Continue Shopping').click();
  }

  clickCheckout() {
    cy.contains(this.checkoutButton, 'Checkout').click();
  }

  removeItemByName(itemName) {
    const normalizedName = itemName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    cy.get(`[data-test="remove-${normalizedName}"]`).click();
  }

  verifyItemInCart(itemName) {
    cy.contains(this.inventoryItemName, itemName).should('be.visible');
  }

  verifyItemNotInCart(itemName) {
    cy.get(this.cartList).should('not.contain', itemName);
  }

  verifyCartBadge(count) {
    cy.get(this.shoppingCartBadge).should('have.text', count);
  }

  verifyCartBadgeNotExists() {
    cy.get(this.shoppingCartBadge).should('not.exist');
  }
}

export default new CartPage(); 