import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';
import SidebarPage from './pages/SidebarPage';

Cypress.Commands.add("login", (username, password) => {
	LoginPage.login(username, password);
});

Cypress.Commands.add("loginAsStandardUser", () => {
	cy.fixture("users").then((users) => {
		cy.login(users.standard.username, users.standard.password);
	});
});

Cypress.Commands.add("addItemToCartByName", (productName) => {
	InventoryPage.addItemToCartByName(productName);
});

Cypress.Commands.add("openMenu", () => {
	SidebarPage.openMenu();
});

Cypress.Commands.add("closeMenu", () => {
	SidebarPage.closeMenu();
});

Cypress.Commands.add("logout", () => {
	SidebarPage.openMenu();
	SidebarPage.clickLogout();
});