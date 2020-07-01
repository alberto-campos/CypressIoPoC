/**
 * This class refers to objects of Landing page for Slack login
 */
class loginPg {
    /**
     * returns the element locator for the email field
     * @returns {String} element locator
     */
    get username(){
        return cy.get('#email')
    }

    /**
     * returns the element locator for the password field
     * @returns {String} element locator
     */
    get password(){
        return cy.get('#password')
    }

    /**
     * returns the element locator for the Sign In button
     * @returns {String} element locator
     */
    get signInBtn(){
        return cy.get('#signin_btn')
    }

    /**
     * returns the element locator for the Sign In here for org owners
     * @returns {String} element locator
     */
    get signInHereLinkforOrgOwners(){
        return cy.get('[data-qa="org_owner_signin_link"]')
    }

    /**
     * Login into slack application
     * @param {String} userName - valid userName of slack.
     * @param {String} pwd - valid password for the user.
     */
    slackLoggingIn(userName, pwd){
        this.username.type(userName)
        this.password.click({force: true })
        this.password.type(pwd)
        this.signInBtn.click({ force: true })
    }
}
export default loginPg;