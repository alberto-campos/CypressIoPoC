//This page refers to Landing page for Slack login
class loginPg{
    getUsername(){
        return cy.get('#email')
    }

    getPassword(){
        return cy.get('#password')
    }

    SignInBtn(){
        return cy.get('#signin_btn')
    }

}
export default loginPg;