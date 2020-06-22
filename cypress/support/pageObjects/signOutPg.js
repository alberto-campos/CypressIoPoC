/**
 * This class refers to Sign out page of Slack Application
 */
class signOutPg{
    /**
     * returns a locator for entire help page displayed
     * @returns {String} elementlocator
     */
    getEntireContent(){
        return cy.get('body')
    }

    /**
     * returns a link locator for Sign In again
     * @returns {String} elementlocator
     */
    getSignInAgainLink(){
        return cy.get('a[data-qa="sign_back_in"]').contains('Sign In Again')
    }
}
export default signOutPg;