// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// templatePage.getTotalAmount().invoke('text').then((text) => {
//   expect(actualtotal).to.equal(expectedtotal);
Cypress.Commands.add('login', () => {
  cy.visit(Cypress.env('url'));
  cy.get('input[name="username"]').should('be.visible').type("Admin");
  cy.get('input[name="password"]').type("admin123");
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('selectDropdownItem', (dropdownSelector, itemText) => {
  cy.get(dropdownSelector).then(($list) => {
    const $targetItem = $list.filter((index, element) => {
      return Cypress.$(element).text() === itemText;
    });
    if ($targetItem.length) {
      cy.wrap($targetItem).scrollIntoView().click();
    } else {
      throw new Error(`Item ${itemText} not found in the dropdown.`);
    }
  });
});

Cypress.Commands.add('selectDropdownItemByText', (itemText) => {
  cy.get('body').find('li, div, span, a')
    .contains(itemText)
    .scrollIntoView()
    .click();
});

Cypress.Commands.add('generateRandomEmail', () => {
  const timestamp = new Date().getTime();
  return `testuser_${timestamp}@example.com`;
});

Cypress.Commands.add('generateRandomNumber', (min = 1000, max = 9999) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
});

Cypress.Commands.add('selectDate', (date) => {
  cy.get("div[class='oxd-calendar-dates-grid'] div")
      .contains(date)
      .click();
});

Cypress.Commands.add('selectDateFromCalendar', (month, year, date) => {
  function navigateToMonth(month, year) {
    function checkAndNavigate() {
      cy.get('div[aria-label^="Choose"]', { timeout: 20000 }).then(($header) => {
        const currentHeaderText = $header.attr('aria-label');
        const currentMonthYear = currentHeaderText.match(/Choose\s+(\w+),\s+(\w+)\s+(\d{1,2}(?:st|nd|rd|th)?)\,?\s*(\d{4})/);

        if (currentMonthYear) {
        //  const currentDay = currentMonthYear[1];
          const currentMonth = currentMonthYear[2];
          const currentDate = currentMonthYear[3];
          const currentYear = currentMonthYear[4];

          if (currentMonth !== month || currentYear !== year) {
            if (new Date(Date.parse(currentMonth + " 1, " + currentYear)).getTime() < new Date(Date.parse(month + " 1, " + year)).getTime()) {
              cy.get('.react-datepicker__navigation--next').click();
            } else {
              cy.get('.react-datepicker__navigation--previous').click();
            }

            cy.wait(1000);
            checkAndNavigate();
          }
        }
      });
    }
    checkAndNavigate();
  }
  navigateToMonth(month, year);
  cy.get(`div[aria-label='Choose ${month} ${date}, ${year}']`).click({ force: true });
});
