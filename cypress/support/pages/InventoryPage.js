class InventoryPage {
  inventoryContainer = '[data-test="inventory-container"]';
  inventoryItems = '[data-test="inventory-item"]';
  inventoryItemName = '[data-test="inventory-item-name"]';
  inventoryItemPrice = '[data-test="inventory-item-price"]';
  inventoryItemDesc = '[data-test="inventory-item-desc"]';
  productSortContainer = '[data-test="product-sort-container"]';
  addToCartButton = '[data-test^="add-to-cart"]';
  shoppingCartBadge = '[data-test="shopping-cart-badge"]';
  shoppingCartLink = '[data-test="shopping-cart-link"]';

  navigateTo() {
    cy.url().should('include', '/inventory.html');
  }

  clickItemByName(productName) {
    cy.contains(this.inventoryItemName, productName).click();
  }

  selectSortOrder(sortOrder) {
    cy.get(this.productSortContainer).select(sortOrder);
  }

  clickShoppingCart() {
    cy.get(this.shoppingCartLink).click();
  }

  verifyInventoryContainerVisible() {
    cy.get(this.inventoryContainer).should('be.visible');
  }

  verifyItemCount(count) {
    cy.get(this.inventoryItems).should('have.length', count);
  }

  addItemToCartByName(productName) {
    cy.contains(this.inventoryItems, productName).should('be.visible').within(() => {
      cy.contains('button', 'Add to cart').click();
      cy.contains('button', 'Remove').should('be.visible');
    });
  }

  verifyItemDetailsVisible(productName, price, description) {
    cy.get(this.inventoryItemName).should('contain', productName);
    cy.get(this.inventoryItemPrice).should('contain', price);
    cy.get(this.addToCartButton).should('be.visible').and('contain', 'Add to cart');
    cy.get(this.inventoryItemDesc).should('contain', description);
  }

  verifyFirstItemPrice(expectedPrice) {
    cy.get(this.inventoryItemPrice).first().should('contain', expectedPrice);
  }

  verifyFirstItemName(expectedName) {
    cy.get(this.inventoryItemName).first().should('contain', expectedName);
  }

  verifyCartBadge(count) {
    cy.get(this.shoppingCartBadge).should('have.text', count);
  }

  removeItemByName(productName) {
    cy.contains(this.inventoryItems, productName).should('be.visible').within(() => {
      cy.contains('button', 'Remove').click();
    });
  }
}

export default new InventoryPage();