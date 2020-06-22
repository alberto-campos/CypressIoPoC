/**
 * This class refers to objects of Landing page for Slack login
 */
class loginPg{
    /**
     * returns the element locator for the email field
     * @returns {String} element locator
     */
    getUsername(){
        return cy.get('#email')
    }

    /**
     * returns the element locator for the password field
     * @returns {String} element locator
     */
    getPassword(){
        return cy.get('#password')
    }

    /**
     * returns the element locator for the Sign In button
     * @returns {String} element locator
     */
    SignInBtn(){
        return cy.get('#signin_btn')
    }

}
export default loginPg;