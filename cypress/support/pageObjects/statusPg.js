//This class refers to objects relevant to Member Status changes
class statusPg{
    /**
     * returns a locator for team menu status
     * @return {elementlocator}
     */
    getTeamMenuStatus(){
        return cy.get('button[data-qa="main-menu-custom-status-item"]')
    }

    /**
     * returns a locator for Set Status Dialog header text
     * @return {elementlocator}
     */
    getSetStatusDialogHeader(){
        return cy.get('.c-sk-modal_title_bar__text>h1')
    }

    /**
     * returns a locator for Status input box
     * @return {elementlocator}
     */
    getWhatsYourStatus(){
        return cy.get('.p-custom_status_modal__input')
    }

    /**
     * returns a locator for status with 'in A Meeting'
     * @return {elementlocator}
     */
    getStatus_InAMeeting(){
        return cy.get('.p-custom_status_modal__preset_text')
    }

    /**
     * returns a locator for Select Duration button
     * @return {elementlocator}
     */
    getSelectDurationBtn(){
        return cy.get('div.c-select_button__content+i')
    }

    /**
     * returns a locator for Select Duration options.
     * @return {elementlocator}
     */
    getSelectDurationList(){
        return cy.get('.c-select_options_list__option_label')
    }

    /**
     * returns a locator for Save Status button
     * @return {elementlocator}
     */
    getSaveStatusBtn(){
        return cy.get('.c-button--primary')
    }

    /**
     * returns a locator for calender icon
     * @return {elementlocator}
     */
    getCalenderIcon(){
        return cy.get('.p-ia__sidebar_header__user > .c-custom_status > .c-emoji > img')
    }

    /**
     * returns a locator for Status Tool Tip
     * @return {elementlocator}
     */
    getStatusToolTip(){
        return cy.get('span.c-custom_status__tooltip')
    }
}
export default statusPg;