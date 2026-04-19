import SidebarPage from '../../support/pages/SidebarPage';
import InventoryPage from '../../support/pages/InventoryPage';
import CartPage from '../../support/pages/CartPage';
import LoginPage from '../../support/pages/LoginPage';

describe("Sidebar", () => {
  beforeEach(function () {
    cy.visit('/');
    cy.fixture("users").then(function (users) {
      cy.login(users.standard.username, users.standard.password);
      cy.url().should('include', '/inventory.html');
    });
  });

  it("displays the correct navigation options", () => {
    SidebarPage.openMenu();
    SidebarPage.verifyMenuOptionsVisible();
  });

  it("navigates to All Items from sidebar", () => {
    SidebarPage.openMenu();
    SidebarPage.clickAllItems();
    cy.url().should('include', '/inventory.html');
  });

  it("logs out from sidebar", () => {
    SidebarPage.openMenu();
    SidebarPage.clickLogout();
    cy.url().should('eq', 'https://www.saucedemo.com/');
    LoginPage.verifyLoginButtonVisible();
  });

  it("resets app state from sidebar", () => {
    cy.addItemToCartByName("Sauce Labs Backpack");
    InventoryPage.verifyCartBadge("1");
    SidebarPage.openMenu();
    SidebarPage.clickResetAppState();
    CartPage.verifyCartBadgeNotExists();
  });

  it("closes the sidebar when the close button is clicked", () => {
    SidebarPage.openMenu();
    SidebarPage.closeMenu();
    SidebarPage.verifyMenuClosed();
  });

  it("navigates to About from sidebar", () => {
    SidebarPage.openMenu();
    SidebarPage.clickAbout();
    cy.url().should("include", "saucelabs.com");
  });
});