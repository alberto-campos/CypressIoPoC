/**
 * This class refers to objects relevant to Member Status changes
 */
class statusPg{
    /**
     * returns a locator for team menu status
     * @returns {String} element locator
     */
    getTeamMenuStatus(){
        return cy.get('button[data-qa="main-menu-custom-status-item"]')
    }

    /**
     * returns a locator for Set Status Dialog header text
     * @returns {String} element locator
     */
    getSetStatusDialogHeader(){
        return cy.get('.c-sk-modal_title_bar__text>h1')
    }

    /**
     * returns a locator for Status input box
     * @returns {String} element locator
     */
    getWhatsYourStatus(){
        return cy.get('.p-custom_status_modal__input')
    }

    /**
     * returns a locator for status with 'in A Meeting'
     * @returns {String} element locator
     */
    getStatus_InAMeeting(){
        return cy.get('.p-custom_status_modal__preset_text')
    }

    /**
     * returns a locator for Select Duration button
     * @returns {String} element locator
     */
    getSelectDurationBtn(){
        return cy.get('div.c-select_button__content+i')
    }

    /**
     * returns a locator for Select Duration options.
     * @returns {String} element locator
     */
    getSelectDurationList(){
        return cy.get('.c-select_options_list__option_label')
    }

    /**
     * returns a locator for Save Status button
     * @returns {String} element locator
     */
    getSaveStatusBtn(){
        return cy.get('.c-button--primary')
    }

    /**
     * returns a locator for calender icon
     * @returns {String} element locator
     */
    getCalenderIcon(){
        return cy.get('.p-ia__sidebar_header__user > .c-custom_status > .c-emoji > img')
    }

    /**
     * returns a locator for Status Tool Tip
     * @returns {String} element locator
     */
    getStatusToolTip(){
        return cy.get('span.c-custom_status__tooltip')
    }
}
export default statusPg;