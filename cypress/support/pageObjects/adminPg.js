// This page refers to 'Settings & Administration->Manage Members' obbjects in Team Menu
class adminPg{

    getManageMembersHeader(){
        return cy.get('.p-admin_table-wrapper__headline')
    }

    getAdminMemberSrchInput(){
        return cy.get('div[data-qa="admin_member_search"]')
    }

    getAdminMenuBtn(){
        return cy.get('.c-button-unstyled > .c-icon')
    }

    getAdminOptions(){
        return cy.get('div.c-menu_item__li>button')
    }

    getResendInvitationOption(){
        return cy.get('div.c-menu_item__li>button').eq(1)
    }

    getRevokeInvitationOption(){
        return cy.get('div.c-menu_item__li>button').eq(3)
    }

    getActivateAccountOption(){
        return cy.get('div.c-menu_item__li>button').eq(0)
    }

    getDeactivateBtn(){
        return cy.get('.c-button--danger',{timeout:5000})
    }

    getDeactivateConfirmationDialogHeader(){
        return cy.get('.c-dialog__title')
    }

    getDeactivatedMsg(){
        return cy.get('.c-toast__wrapper',{timeout:5000})
    }
}
export default adminPg;