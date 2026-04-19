import LoginPage from '../../support/pages/LoginPage';
import InventoryPage from '../../support/pages/InventoryPage';

describe("Authentication", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    LoginPage.visit();
  });

  it("shows username and password placeholders", () => {
    LoginPage.verifyUsernamePlaceholder();
    LoginPage.verifyPasswordPlaceholder();
  });

  it("shows Login button", () => {
    LoginPage.verifyLoginButtonVisible();
    LoginPage.verifyLoginButtonColor();
  });

  it("background colors are correct", () => {
    LoginPage.verifyLoginWrapperBackground();
    LoginPage.verifyCredentialsWrapBackground();
  });

  it("shows accepted usernames and password", () => {
    LoginPage.verifyAcceptedUsernamesDisplayed();
    LoginPage.verifyPasswordDisplayed();
  });

  it("shows error for blank credentials", () => {
    LoginPage.clickLoginButton();
    LoginPage.verifyErrorMessage("Epic sadface: Username is required");
  });

  it("shows error for invalid credentials", function () {
    cy.login(this.users.invalid.username, this.users.invalid.password);
    LoginPage.verifyErrorMessage("Epic sadface: Username and password do not match");
  });

  it("blocks locked_out_user", function () {
    cy.login(this.users.locked.username, this.users.locked.password);
    LoginPage.verifyErrorMessage("Epic sadface: Sorry, this user has been locked out");
  });

  ["standard", "problem", "performance", "error", "visual"].forEach((userType ) => {
    it(`logs in successfully as ${userType }_user`, function () {
      const user = this.users[userType];
      cy.login(user.username, user.password);
      InventoryPage.navigateTo();
      InventoryPage.verifyInventoryContainerVisible();
      cy.logout();
      cy.url().should("eq", "https://www.saucedemo.com/");
      LoginPage.verifyLoginButtonVisible();
    });
  });

  it("redirects to login when visiting inventory after logout", function () {
    cy.login(this.users.standard.username, this.users.standard.password);
    InventoryPage.navigateTo();
    cy.logout();
    LoginPage.verifyLoginButtonVisible();
  });
});