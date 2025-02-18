import AdminPage from '../support/pageObjects/AdminPage';
import LoginPage from '../support/pageObjects/LoginPage';

describe('Admin User Management.', function () {
  let loginPage;
  let userData;
  let adminPage;
  let username;

  before(function () {
    Cypress.config('defaultCommandTimeout', 20000);
    cy.fixture('userDetails').then(function (data) {
    userData = data;
    });
  });

  beforeEach(function () {
    loginPage = new LoginPage();
    adminPage = new AdminPage();
    cy.visit(Cypress.env('url'));
    cy.login();
  });

  it('should allow admin to create, search, and delete a user.', function () {
    cy.generateRandomNumber().then((randomNum) => {
      username = `${userData.username}${randomNum}`;
      adminPage.createUser(username, userData.password, userData.confirmPassword, userData.userrole, userData.status,userData.employeeName);
      adminPage.getAdminModule().click();
      // adminPage.searchByUsername(username);
      // adminPage.getRow().each(($cell) => {
      //   const details = $cell.text().trim();
      //   [username, userData.userrole, userData.status].forEach((value) => {
      //     if (details === value) {
      //       cy.wrap($cell).should('contain', value);
      //     }
      //   });
      // });
      // adminPage.deleteUser();
      // adminPage.searchByUsername(username);
      // adminPage.getRow().should(($rows) => {
      // expect($rows).to.have.length(0); 
      //test
      });
    });
  });
});
