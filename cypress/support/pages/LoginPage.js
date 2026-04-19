class LoginPage {
  usernameInput = '[data-test="username"]';
  passwordInput = '[data-test="password"]';
  loginButton = '[data-test="login-button"]';
  errorMessage = '[data-test="error"]';
  loginCredentials = '[data-test="login-credentials"]';
  loginPassword = '[data-test="login-password"]';
  loginWrapperInner = '.login_wrapper-inner';
  loginCredentialsWrapInner = '.login_credentials_wrap-inner';

  visit() {
    cy.visit('/');
  }

  fillUsername(username) {
    cy.get(this.usernameInput).clear().type(username);
  }

  fillPassword(password) {
    cy.get(this.passwordInput).clear().type(password);
  }

  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLoginButton();
  }

  verifyUsernamePlaceholder() {
    cy.get(this.usernameInput).should('have.attr', 'placeholder', 'Username');
  }

  verifyPasswordPlaceholder() {
    cy.get(this.passwordInput).should('have.attr', 'placeholder', 'Password');
  }

  verifyLoginButtonVisible() {
    cy.get(this.loginButton).should('be.visible').and('contain', 'Login');
  }

  verifyLoginButtonColor() {
    cy.get(this.loginButton).should('have.css', 'background-color').and('eq', 'rgb(61, 220, 145)');
  }

  verifyLoginWrapperBackground() {
    cy.get(this.loginWrapperInner).should('have.css', 'background-color').and('eq', 'rgb(255, 255, 255)');
  }

  verifyCredentialsWrapBackground() {
    cy.get(this.loginCredentialsWrapInner).should('have.css', 'background-color').and('eq', 'rgb(19, 35, 34)');
  }

  verifyAcceptedUsernamesDisplayed() {
    cy.get(this.loginCredentials)
      .should('be.visible')
      .and('contain', 'Accepted usernames are:')
      .and('contain', 'standard_user')
      .and('contain', 'locked_out_user')
      .and('contain', 'problem_user')
      .and('contain', 'performance_glitch_user');
  }

  verifyPasswordDisplayed() {
    cy.get(this.loginPassword)
      .should('be.visible')
      .and('contain', 'Password for all users:')
      .and('contain', 'secret_sauce');
  }

  verifyErrorMessage(message) {
    cy.get(this.errorMessage).should('be.visible').and('contain', message);
  }
}

export default new LoginPage();