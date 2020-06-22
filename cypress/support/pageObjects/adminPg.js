/**
 * This page refers to 'Settings & Administration->Manage Members' objects in Team Menu
 */
class adminPg{
    /**
     * returns locator for manage member dialog header text
     * @returns {String} element locator
     */
    getManageMembersHeader(){
        return cy.get('.p-admin_table-wrapper__headline')
    }

    /**
     * returns locator for admin member search textbox
     * @returns {String} element locator
     */
    getAdminMemberSrchInput(){
        return cy.get('div[data-qa="admin_member_search"]')
    }

    /**
     * returns locator/locators for Admin member list table menu icon
     * @returns {String} element locator
     */
    getAdminMemberTblMenuBtn(){
        return cy.get('[data-qa^="admin_member_table_menu_btn-"]')
    }

    /**
     * returns locator for Admin member list table menu options
     * @returns {String} element locator
     */
    getAdminMemberTblMenuOptions(){
        return cy.get('div.c-menu_item__li>button')
    }

    /**
     * returns locator for Admin member list table menu option: Resend Invitation
     * @returns {String} element locator
     */
    getResendInvitationOption(){
        return cy.get('div.c-menu_item__li>button').eq(1)
    }

    /**
     * returns locator for Admin member list table menu option: Revoke Invitation
     * @returns {String} element locator
     */
    getRevokeInvitationOption(){
        return cy.get('div.c-menu_item__li>button').eq(3)
    }

     /**
     * returns locator for Admin member list table menu option: Activate Account
     * @returns {String} element locator
     */
    getActivateAccountOption(){
        return cy.get('div.c-menu_item__li>button').eq(0)
    }

    /**
     * returns locator for Deactiavte button for member
     * @returns {String} element locator
     */
    getDeactivateBtn(){
        return cy.get('.c-button--danger',{timeout:5000})
    }

    /**
     * returns locator for Deactiavte member confirmation dialogue
     * @returns {String} element locator
     */
    getDeactivateConfirmationDialogHeader(){
        return cy.get('.c-dialog__title',{timeout: 10000})
    }

    /**
     * returns locator for member name text in admin member table
     * @returns {String} element locator
     */
    getMemberNameLocator(){
        return cy.get('.p-admin_member_table__row__display_name')
    }

    /**
     * returns locator for member's email address text in admin member table
     * @returns {String} element locator
     */
    getMemberEmailLocator(){
        return cy.get('.p-admin_member_table__row__email--address')
    }

    /**
     * returns locator for checkbox for Account as Workspace Admin
     * @returns {String} element locator
     */
    selAccountAsAdminChkBox(){
        return cy.get('#change-account-type-admin')
    }

    /**
     * returns locator for checkbox for Account as Full Member
     * @returns {String} element locator
     */
    selAccountAsFullmemberChkBox(){
        return cy.get('#change-account-type-member')
    }

    /**
     * returns locator for Save button displayed while selecting account type
     * @returns {String} element locator
     */
    getChangeAcctType_SaveBtn(){
        return cy.get('button[data-qa="change_account_type_save_btn"]',{timeout:5000}).contains('Save')
    }

    /**
     * returns locator for account type text displayed in Admin table
     * @returns {String} element locator
     */
    getMemberAcctType(){
        return cy.get('.p-admin_member_table__member_type>div+div')
    }

    /**
     * returns locator for sign out link
     * @returns {String} element locator
     */
    getSignOutLink(){
        return cy.get('a[data-qa="sign_out"]',{timeout:5000})
    }

    /**
     * returns locator for Admin Menu Icon
     * @returns {String} element locator
     */
    getAdminMenuIcon(){
        return cy.get('.menu_icon')
    }
}
export default adminPg;