import LoginPage from '../support/pageObjects/LoginPage'
import LeavePage from '../support/pageObjects/LeavePage'
describe('Leave Application Workflow.', function () {
  let loginPage;
  let userData;
  let leavePage;
  before(function () {
    Cypress.config('defaultCommandTimeout', 20000);
    cy.fixture('leaveDetails').then(function (data) {
      userData = data;
    })
  })

  beforeEach(function () {
    loginPage = new LoginPage();
    leavePage = new LeavePage();
    cy.visit(Cypress.env('url'));
    cy.login();
  });
  
  it('should allow user to apply for leave and validate the leave details.', function () {
    leavePage.createLeave(userData.leaveType,userData.fromDate, userData.toDate)
    leavePage.getMyLeave().click();
    leavePage.filterByDates(userData.fromDate, userData.toDate);
    leavePage.selectLeaveType(userData.leaveType);
    leavePage.getSearch().click();
    leavePage.validateTableRows([userData.fromDate, userData.toDate, userData.leaveType]);
    leavePage.addCommentToLeave(userData.comment);
    leavePage.validateTableRows([userData.comment]);
});


});
