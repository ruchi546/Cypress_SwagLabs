class SidebarPage {
  menuButton = '#react-burger-menu-btn';
  closeButton = '#react-burger-cross-btn';
  inventorySidebarLink = '[data-test="inventory-sidebar-link"]';
  aboutSidebarLink = '[data-test="about-sidebar-link"]';
  logoutSidebarLink = '[data-test="logout-sidebar-link"]';
  resetSidebarLink = '[data-test="reset-sidebar-link"]';

  openMenu() {
    cy.get(this.menuButton).should('be.visible').click();
  }

  closeMenu() {
    cy.get(this.closeButton).should('be.visible').click();
  }

  clickAllItems() {
    cy.get(this.inventorySidebarLink).should('exist').and('be.visible').and('contain', 'All Items').click();
  }

  clickAbout() {
    cy.get(this.aboutSidebarLink).should('exist').and('be.visible').and('contain', 'About').click();
  }

  clickLogout() {
    cy.get(this.logoutSidebarLink).should('exist').and('be.visible').and('contain', 'Logout').click();
  }

  clickResetAppState() {
    cy.get(this.resetSidebarLink).should('exist').and('be.visible').and('contain', 'Reset App State').click();
  }

  verifyMenuOptionsVisible() {
    cy.get(this.inventorySidebarLink).should('exist').and('be.visible').and('contain', 'All Items');
    cy.get(this.aboutSidebarLink).should('exist').and('be.visible').and('contain', 'About');
    cy.get(this.logoutSidebarLink).should('exist').and('be.visible').and('contain', 'Logout');
    cy.get(this.resetSidebarLink).should('exist').and('be.visible').and('contain', 'Reset App State');
  }

  verifyMenuClosed() {
    cy.get(this.inventorySidebarLink).should('not.be.visible');
  }
}

export default new SidebarPage();