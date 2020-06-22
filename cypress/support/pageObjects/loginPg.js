//This class refers to objects of Landing page for Slack login
class loginPg{
    /**
     * returns the element locator for the email field
     * @return {elementlocator}
     */
    getUsername(){
        return cy.get('#email')
    }

    /**
     * returns the element locator for the password field
     * @return {elementlocator}
     */
    getPassword(){
        return cy.get('#password')
    }

    /**
     * returns the element locator for the Sign In button
     * @return {elementlocator}
     */
    SignInBtn(){
        return cy.get('#signin_btn')
    }

}
export default loginPg;