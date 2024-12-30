import LoginPage from '../support/pageObjects/LoginPage'
describe('Login Functionality', function () {
  let loginPage;
  let userData;
  before(function () {
    Cypress.config('defaultCommandTimeout', 20000);
    cy.fixture('loginCredentials').then(function (data) {
      userData = data;
    })
  })

  beforeEach(function () {
    loginPage = new LoginPage();
    cy.visit(Cypress.env('url'));
  });

  it('should allow the user to log in and access the dashboard.', function () {
    loginPage.getUsername().should('be.visible').type(userData.username);
    loginPage.getPassword().should('be.visible').type(userData.password);
    loginPage.getLoginButton().click()
    loginPage.getDashboard().should('have.text',"Dashboard")
    loginPage.getExpandIcon().click()
  });












  
});
