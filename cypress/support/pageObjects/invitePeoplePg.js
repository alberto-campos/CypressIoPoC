//This page refers to all activities wrt Invite People
class invitePeoplePg{
    
    getInviteeEmailInput1(){
        return cy.get('#invite_modal_email_0')
    }

    getInviteeEmailInput2(){
        return cy.get('#invite_modal_email_1')
    }

    getAddInviteesBtn(){
        return cy.contains('.c-button--primary', 'Add Invitees', { timeout: 10000})
    }

    getSendInvitationsBtn(){
        //return cy.get('.c-button--primary')
        return cy.contains('.c-button--primary', 'Send Invitations', { timeout: 10000})
    }

    getAddAnotherEmailLink(){
        return cy.get('[data-qa="invite_modal_add_row_button"]')
    }

    getAddManyAtOnceLink(){
        return cy.get('[data-qa="invite_modal_bulk_invite_button"]')
    }

    getBulkInviteInput(){
        return cy.get('#bulk-invites-input')
    }

    getInvitesSentMsg(){
        return cy.get('[data-qa="invite_modal_invites_sent_subheader_copy"]')   
    }

    getDoneBtn(){
        return cy.get('.c-sk-modal_footer_actions > .c-button--primary')
    }
}
export default invitePeoplePg;