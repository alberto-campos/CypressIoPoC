class signOutPg{
    /**
     * returns a locator for entire help page displayed
     * @return {elementlocator}
     */
    getEntireContent(){
        return cy.get('body')
    }

    /**
     * returns a link locator for 'Sign In again'
     * @return {elementlocator}
     */
    getSignInAgainLink(){
        return cy.get('a[data-qa="sign_back_in"]').contains('Sign In Again')
    }
}
export default signOutPg;