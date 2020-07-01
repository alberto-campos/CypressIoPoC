/**
 * This class refers to Sign out page of Slack Application
 */
class signOutPg {
    /**
     * returns a locator for entire help page displayed
     * @returns {String} elementlocator
     */
    get entireContent(){
        return cy.get('body')
    }

    /**
     * returns a link locator for Sign In again
     * @returns {String} elementlocator
     */
    get signInAgainLink(){
        return cy.get('a[data-qa="sign_back_in"]').contains('Sign In Again')
    }
}
export default signOutPg;