class AdminPage{

    getAdminModule(){
        return cy.get("ul[class='oxd-main-menu']").contains('span', 'Admin')
    }

    getAddButton(){
        return cy.get('button').contains('Add')
    }

    getUserRole(){
        return cy.contains('.oxd-label.oxd-input-field-required', 'User Role').parent().siblings()
    }

    getEmployeeName(){
        return cy.get('input[placeholder="Type for hints..."]').parent('div')
    }

    getList(){
        return cy.get('[role="listbox"]').first()
    }

    getStatus(){
        return cy.contains('.oxd-label.oxd-input-field-required', 'Status').parent().siblings()
    }

    getUsername(){
        return cy.contains('.oxd-label.oxd-input-field-required', 'Username').parent().siblings().find('input')
    }

    getPassword(){
        return cy.contains('.oxd-label', 'Password').parent().siblings().find('input')
    }

    getConfirmPassword(){
        return cy.contains('.oxd-label', 'Confirm Password').parent().siblings().find('input')
    }

    getSave(){
        return cy.get('button[type="submit"]')
    }

    getSuccessMessage(){
        return cy.contains('success')
    }

        getSearchByUsername() {
            return cy.contains('.oxd-label', 'Username').should('exist').parent().siblings().find('input')
    }

    getSearch(){
        return cy.get('button[type="submit"]')
    }

    getUsernameColumn(){
        return cy.get('div[class="oxd-table-header"] div[role="columnheader"]').contains('Username')
    }

    getRow(){
        return cy.get('div[class="oxd-table-body"] div[class="oxd-table-card"] div[role="row"] div[role="cell"]')
    }

    getDelete(){
        return cy.get('.oxd-icon.bi-trash')
    }
    
    getConfirmDelete(){
        return cy.get('button[class="oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin"]')
    }
    
    createUser(username, password, confirmPassword, role, status,employeeName) {
        cy.log('Generated username:', username); 
        this.getAdminModule().click();
        this.getAddButton().click();
        this.getUserRole().click()
        cy.selectDropdownItemByText(role)
        this.getEmployeeName().type(employeeName)
        cy.wait(2000); 
        this.getList().click()
        this.getStatus().click()
        cy.selectDropdownItemByText(status)
        this.getUsername().type(username);
        this.getPassword().type(password);
        this.getConfirmPassword().type(confirmPassword);
        this.getSave().click();
      }
    
      searchByUsername(username) {
        this.getSearchByUsername().clear().type(username);
        this.getSearch().click();
        cy.wait(2000)
      }
    
      deleteUser() {
        this.getDelete().click();
        this.getConfirmDelete().click();
      }
    }
    export default AdminPage;