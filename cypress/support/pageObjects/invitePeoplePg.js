//This class refers to objects of 'Invite People' functionality
class invitePeoplePg{
    /**
     * returns a locator for 'email' input box of member to be invited
     * @return {elementlocator}
     */
    getInviteeEmailInput1(){
        return cy.get('#invite_modal_email_0')
    }

    /**
     * returns a locator for 'email' input box of member to be invited
     * @return {elementlocator}
     */
    getInviteeEmailInput2(){
        return cy.get('#invite_modal_email_1')
    }

    /**
     * returns a locator for 'Add Invitees' button
     * @return {elementlocator}
     */
    getAddInviteesBtn(){
        return cy.contains('.c-button--primary', 'Add Invitees', { timeout: 10000})
    }

    /**
     * returns a locator for 'Send Invitation' button
     * @return {elementlocator}
     */
    getSendInvitationsBtn(){
        //return cy.get('.c-button--primary')
        return cy.contains('.c-button--primary', 'Send Invitations', { timeout: 10000})
    }

    /**
     * returns a locator for 'Add another' link on Invite Members dialogue.
     * @return {elementlocator}
     */
    getAddAnotherEmailLink(){
        return cy.get('[data-qa="invite_modal_add_row_button"]')
    }

     /**
     * returns a locator for 'Add many at once' link on Invite Members dialogue.
     * @return {elementlocator}
     */
    getAddManyAtOnceLink(){
        return cy.get('[data-qa="invite_modal_bulk_invite_button"]')
    }

    /**
     * returns a locator for 'Enter multiple email addresses' input box
     * @return {elementlocator}
     */
    getBulkInviteInput(){
        return cy.get('#bulk-invites-input')
    }

    /**
     * returns a locator for message displayed when Invitation is sent.
     * @return {elementlocator}
     */
    getInvitesSentMsg(){
        return cy.get('[data-qa="invite_modal_invites_sent_subheader_copy"]')   
    }

    /**
     * returns a locator for 'Done' button
     * @return {elementlocator}
     */
    getDoneBtn(){
        return cy.get('.c-sk-modal_footer_actions > .c-button--primary')
    }
}
export default invitePeoplePg;