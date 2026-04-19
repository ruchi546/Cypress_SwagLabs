import InventoryPage from '../../support/pages/InventoryPage';

describe("Inventory", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginAsStandardUser();
    InventoryPage.navigateTo();
  });

  it("shows inventory list with expected item count", () => {
    InventoryPage.verifyItemCount(6);
  });

  it("opens a product details page", () => {
    InventoryPage.clickItemByName("Sauce Labs Bolt T-Shirt");
    cy.url().should("include", "/inventory-item.html");
    InventoryPage.verifyItemDetailsVisible(
      "Sauce Labs Bolt T-Shirt",
      "$15.99",
      "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
    );
  });

  const sortTestCases = [
    { sortOrder: "Name (A to Z)", expectedValue: "Sauce Labs Backpack", type: "name" },
    { sortOrder: "Name (Z to A)", expectedValue: "Test.allTheThings() T-Shirt (Red)", type: "name" },
    { sortOrder: "Price (low to high)", expectedValue: "$7.99", type: "price" },
    { sortOrder: "Price (high to low)", expectedValue: "$49.99", type: "price" }
  ];

  sortTestCases.forEach(({ sortOrder, expectedValue, type }) => {
    it(`sorts inventory by ${sortOrder}`, () => {
      InventoryPage.selectSortOrder(sortOrder);
      if (type === "name") {
        InventoryPage.verifyFirstItemName(expectedValue);
      } else {
        InventoryPage.verifyFirstItemPrice(expectedValue);
      }
    });
  });
});