//This page refers to Account Settings related objects
class acctSettingsPg{
    /**
     * returns a locator for 'expand' button related to change password
     * @return {elementlocator}
     */
    getChangePwdExpandBtn(){
     return cy.get('#change_password > .accordion_expand')
    }

    /**
     * returns a locator for 'old password' textbox
     * @return {elementlocator}
     */
    getOldPwdInput(){
        return cy.get('input#old_password')
    }

    /**
     * returns   locator for 'new password' textbox
     * @return {elementlocator}
     */
    getNewPwdInput(){
        return cy.get('input#password')
    }

    /**
     * returns a locator for 'Save password' button
     * @return {elementlocator}
     */
    getSavePwdBtn(){
        return cy.get('#change_password > .accordion_subsection > .col > :nth-child(5) > .btn')
    }

    /**
     * returns a locator for error text which is displayed when user enters identical passwords.
     * @return {elementlocator}
     */
    getPwdIdenticalError(){
        return cy.get('.alert')
    }
    
    /**
     * returns a locator for toggle button for Menu 
     * @return {elementlocator}
     */
    getToggleMenuOnAcctSettings(){
        return cy.get('#menu_toggle')
    }

     /**
     * returns a locator for link 'back to slack'
     * @return {elementlocator}
     */
    getBackToSlacklink(){
        return cy.get('.primary_nav > :nth-child(2) > a')
    }
}
export default acctSettingsPg;