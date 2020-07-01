/**
 * This class refers to Account Settings related objects
 */
 class acctSettingsPg {
    /**
     * returns a locator for 'expand' button related to change password
     * @returns {String} element locator
     */
    get changePwdExpandBtn(){
     return cy.get('#change_password > .accordion_expand')
    }

    /**
     * returns a locator for 'old password' textbox
     * @returns {String} element locator
     */
    get oldPwdInput(){
        return cy.get('input#old_password')
    }

    /**
     * returns   locator for 'new password' textbox
     * @returns {String} element locator
     */
    get newPwdInput(){
        return cy.get('input#password')
    }

    /**
     * returns a locator for 'Save password' button
     *@returns {String} element locator
     */
    get savePwdBtn(){
        return cy.get('#change_password > .accordion_subsection > .col > :nth-child(5) > .btn')
    }

    /**
     * returns a locator for error text which is displayed when user enters identical passwords.
     *@returns {String} element locator
     */
    get pwdIdenticalError(){
        return cy.get('.alert')
    }
    
    /**
     * returns a locator for toggle button for Menu 
     * @returns {String} element locator
     */
    get toggleMenuOnAcctSettings(){
        return cy.get('#menu_toggle')
    }

     /**
     * returns a locator for link 'back to slack'
     * @returns {String} element locator
     */
    get backToSlacklink(){
        return cy.get('.primary_nav > :nth-child(2) > a')
    }
} export default acctSettingsPg;