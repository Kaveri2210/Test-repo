class LoginPage{

getUsername(){
    return cy.get('input[name="username"]')
}

getPassword(){
    return cy.get('input[name="password"]')
}

getLoginButton(){
    return cy.get('button[type="submit"]')
}

getDashboard(){
    return cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module')
}

getExpandIcon(){
    return cy.get('button[role="none"]')
}

}
export default LoginPage;