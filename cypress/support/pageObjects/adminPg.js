/**
 * This page refers to 'Settings & Administration->Manage Members' objects in Team Menu
 */
import baseTest from '../baseTest'

class adminPg extends baseTest{
    /**
     * returns locator for manage member dialog header text
     * @returns {String} element locator
     */
    get manageMembersHeader(){
        return cy.get('.p-admin_table-wrapper__headline')
    }

    /**
     * returns locator for admin member search textbox
     * @returns {String} element locator
     */
    get adminMemberSrchInput(){
        return cy.get('div[data-qa="admin_member_search"]')
    }

    /**
     * returns locator/locators for Admin member list table menu icon
     * @returns {String} element locator
     */
    get adminMemberTblBtn(){
       return cy.get('[data-qa^="admin_member_table_menu_btn-"]').eq(0)
    }

    /**
     * returns locator for Admin member list table menu options
     * @returns {String} element locator
     */
    get adminMemberTblMenuOptions(){
        return cy.get('div.c-menu_item__li>button')
    }

    /**
     * returns locator for Admin member list table menu option: Resend Invitation
     * @returns {String} element locator
     */
    get resendInvitationOption(){
        return cy.get('[data-qa="resend_invitation"]')
    }

    /**
     * returns locator for Admin member list table menu option: Revoke Invitation
     * @returns {String} element locator
     */
    get revokeInvitationOption(){
        return cy.get('[data-qa="deactivate"]')
    }

    /**
     * returns locator for Admin member list table menu option: Activate Account
     * @returns {String} element locator
     */
    get activateAccountOption(){
        return cy.get('[data-qa="activate"]')
    }

    /**
     * returns locator for Admin member list table menu option: Change account type
     * @returns {String} element locator
     */
    get chngeAccountTypeOption(){
        return cy.get('[data-qa="change_account_type"]')
    }

    /**
     * returns locator for Deactiavte button for member
     * @returns {String} element locator
     */
    get deactivateBtn(){
        return cy.get('.c-button--danger',{timeout:5000})
    }

    /**
     * returns locator for Deactiavte member confirmation dialogue
     * @returns {String} element locator
     */
    get deactivateConfirmationDialogHeader(){
        return cy.get('.c-dialog__title',{timeout: 10000})
    }

    /**
     * returns locator for member name text in admin member table
     * @returns {String} element locator
     */
    get memberNameLocator(){
        return cy.get('.p-admin_member_table__row__display_name')
    }

    /**
     * returns locator for member's email address text in admin member table
     * @returns {String} element locator
     */
    get memberEmailLocator(){
        return cy.get('.p-admin_member_table__row__email--address')
    }

    /**
     * returns locator for checkbox for Account as Workspace Admin
     * @returns {String} element locator
     */
    get accountAsAdminChkBox(){
        return cy.get('#change-account-type-admin')
    }

    /**
     * returns locator for checkbox for Account as Full Member
     * @returns {String} element locator
     */
    get accountAsFullmemberChkBox(){
        return cy.get('#change-account-type-member')
    }

    /**
     * returns locator for Save button displayed while selecting account type
     * @returns {String} element locator
     */
    get changeAcctType_SaveBtn(){
        return cy.get('button[data-qa="change_account_type_save_btn"]').contains('Save')
    }

    /**
     * returns locator for account type text displayed in Admin table
     * @returns {String} element locator
     */
    get memberAcctType(){
        return cy.get('.p-admin_member_table__member_type>div+div')
    }

    /**
     * returns locator for sign out link
     * @returns {String} element locator
     */
    get signOutLink(){
        return cy.get('a[data-qa="sign_out"]',{timeout:5000})
    }

    /**
     * returns locator for Admin Menu Icon
     * @returns {String} element locator
     */
    get adminMenuIcon(){
        return cy.get('.menu_icon')
    }

    /**
     * returns spinning wheel for admin member table view
     * @returns {String} element locator
     */
    get tableViewLoadingSpinner(){
        return cy.get('c-table_view_spinner_overlay',{timeout: 10000})
    }

    /**
     * returns toast wrapper text which appears on actiavtion or deactivation of account in admin member table view
     * @returns {String} element locator
     */
    get toastWrapper(){
        return cy.get('.c-toast__wrapper')
    }

}
export default adminPg;