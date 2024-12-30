class LeavePage {

    getLeaveModule() {
        return cy.get("ul[class='oxd-main-menu']").contains('span', 'Leave')
    }

    getApplyLink() {
        return cy.get("a").contains('Apply')
    }

    getLeaveType() {
        return cy.contains('.oxd-label', 'Leave Type').parent().siblings()
    }

    getFromDate() {
        return cy.contains('.oxd-label', 'From Date').parent().siblings()
    }

    getToDate() {
        return cy.get('input[placeholder="yyyy-mm-dd"]').eq(1)
    }

    getComment() {
        return cy.contains('.oxd-label', 'Comments').parent().siblings()
    }

    getApply() {
        return cy.get('button[type="submit"]')
    }

    getMyLeave() {
        return cy.get("a").contains('My Leave')
    }

    getListLeaveType() {
        return cy.contains('.oxd-label', 'Leave Type').parent().siblings()
    }

    getListFromDate() {
        return cy.get('input[placeholder="yyyy-mm-dd"]').eq(0)
    }

    getListToDate() {
        return cy.get('input[placeholder="yyyy-mm-dd"]').eq(1)
    }

   getSearch(){
        return cy.get('button[type="submit"]')
    }

    getRow(){
        return cy.get('div[class="oxd-table-body"] div[class="oxd-table-card"] div[role="row"] div[role="cell"]')
    }

    getThreeDots() {
        return cy.get('[class="oxd-icon bi-three-dots-vertical"]').first()
    }

    getCommentHere() {
        return cy.get('textarea[placeholder="Comment here"]')
    }

    getSave() {
        return cy.get('div[role="document"] button[type="submit"]')
    }
    

    createLeave(leaveType,fromDate,toDate) {
        this.getLeaveModule().click();
        this.getApplyLink().click();
        this.selectLeaveType(leaveType);
        this.getFromDate().click()
        cy.selectDate(fromDate); 
        this.getToDate().click()
        cy.selectDate(toDate); 
        this.getApply().click();
    }

    selectLeaveType(leaveType) {
        this.getLeaveType().click();
        cy.selectDropdownItemByText(leaveType); 
    }

    filterByDates(fromDate, toDate) {
    this.getListFromDate().click()
    cy.selectDate(fromDate); 
    this.getListToDate().click()
    cy.selectDate(toDate); 
    }

    validateTableRows(values) {
        this.getRow().each(($cell) => {
            const details = $cell.text().trim();
            values.forEach((value) => {
                if (details === value) {
                    cy.wrap($cell).should('contain', value);
                }
            });
        });
    }

    addCommentToLeave(comment) {
        this.getThreeDots().click();
        cy.selectDropdownItemByText("Add Comment");
        this.getCommentHere().type(comment);
        this.getSave().click();
    }



    }
    export default LeavePage;