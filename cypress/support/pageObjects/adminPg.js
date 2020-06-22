// This page refers to 'Settings & Administration->Manage Members' objects in Team Menu
class adminPg{
    /**
     * returns locator for manage member dialog header text
     * @return {elementlocator}
     */
    getManageMembersHeader(){
        return cy.get('.p-admin_table-wrapper__headline')
    }

    /**
     * returns locator for admin member search textbox
     * @return {elementlocator}
     */
    getAdminMemberSrchInput(){
        return cy.get('div[data-qa="admin_member_search"]')
    }

    /**
     * returns locator/locators for Admin member list table menu icon
     * @return {elementlocator}
     */
    getAdminMemberTblMenuBtn(){
        return cy.get('[data-qa^="admin_member_table_menu_btn-"]')
    }

    /**
     * returns locator for Admin member list table menu options
     * @return {elementlocator}
     */
    getAdminMemberTblMenuOptions(){
        return cy.get('div.c-menu_item__li>button')
    }

    /**
     * returns locator for Admin member list table menu option: Resend Invitation
     * @return {elementlocator}
     */
    getResendInvitationOption(){
        return cy.get('div.c-menu_item__li>button').eq(1)
    }

    /**
     * returns locator for Admin member list table menu option: Revoke Invitation
     * @return {elementlocator}
     */
    getRevokeInvitationOption(){
        return cy.get('div.c-menu_item__li>button').eq(3)
    }

     /**
     * returns locator for Admin member list table menu option: Activate Account
     * @return {elementlocator}
     */
    getActivateAccountOption(){
        return cy.get('div.c-menu_item__li>button').eq(0)
    }

    /**
     * returns locator for Deactiavte button for member
     * @return {elementlocator}
     */
    getDeactivateBtn(){
        return cy.get('.c-button--danger',{timeout:5000})
    }

    /**
     * returns locator for Deactiavte member confirmation dialogue
     * @return {elementlocator}
     */
    getDeactivateConfirmationDialogHeader(){
        return cy.get('.c-dialog__title',{timeout: 10000})
    }

    /**
     * returns locator for member name text in admin member table
     * @return {elementlocator}
     */
    getMemberNameLocator(){
        return cy.get('.p-admin_member_table__row__display_name')
    }

    /**
     * returns locator for member's email address text in admin member table
     * @return {elementlocator}
     */
    getMemberEmailLocator(){
        return cy.get('.p-admin_member_table__row__email--address')
    }

    /**
     * returns locator for checkbox for Account as Workspace Admin
     * @return {elementlocator}
     */
    selAccountAsAdminChkBox(){
        return cy.get('#change-account-type-admin')
    }

    /**
     * returns locator for checkbox for Account as Full Member
     * @return {elementlocator}
     */
    selAccountAsFullmemberChkBox(){
        return cy.get('#change-account-type-member')
    }

    /**
     * returns locator for Save button displayed while selecting account type
     * @return {elementlocator}
     */
    getChangeAcctType_SaveBtn(){
        return cy.get('button[data-qa="change_account_type_save_btn"]',{timeout:5000}).contains('Save')
    }

    /**
     * returns locator for account type text displayed in Admin table
     * @return {elementlocator}
     */
    getMemberAcctType(){
        return cy.get('.p-admin_member_table__member_type>div+div')
    }

    /**
     * returns locator for sign out link
     * @return {elementlocator}
     */
    getSignOutLink(){
        return cy.get('a[data-qa="sign_out"]',{timeout:5000})
    }

    /**
     * returns locator for Admin Menu Icon
     * @return {elementlocator}
     */
    getAdminMenuIcon(){
        return cy.get('.menu_icon')
    }
}
export default adminPg;