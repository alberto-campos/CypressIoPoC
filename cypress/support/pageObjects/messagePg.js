/**
 * This class refers to all objects wrt send message, edit message , delete message etc.
 */
class messagePg{
    /**
     * returns a locator Direct Messages dialog header text
     * @returns {String} element locator
     */
    getDirectMessagesHeading(){
        return cy.get('.c-sk-modal_title_bar__text > h1')
    }

    /**
     * returns a locator for find user search input
     * @returns {String} element locator
     */
    getFindUserInput(){
        return cy.get('#dm-browser')
    }

    /**
     * returns a locator for 'Go' button to search user
     * @returns {String} element locator
     */
    getGObtn(){
        return cy.get('.p-dm_browser_modal__controls > .c-button')
    }

    /**
     * returns a locator for message input
     * @returns {String} element locator
     */
    getMsgInput(){
        return cy.get('.p-message_input_field > #undefined > p')
    }

    /**
     * returns a locator for most recent message displayed in the conversation
     * @returns {String} element locator
     */
    getMostRecentMsg(){
        return cy.get('div.c-message_kit__hover').last()
    }

    /**
     * returns a locator for message shortcuts->More ACtions button
     * @returns {String} element locator
     */
    getMoreActions(){
        return cy.get('div[class="c-message_actions__container c-message__actions"]>button').last()
    }

    /**
     * returns a locator for 'edit message' option which is displayed on the click of more actions shortcut of messages.
     * @returns {String} element locator
     */
    getEditMessageOption(){
        return cy.contains('Edit message')
    }

    /**
     * returns a locator for message input for editing
     * @returns {String} element locator
     */
    getEditMsgInput(){
        return cy.get('.c-message__editor__input > #undefined > p')
    }

    /**
     * returns a locator for 'Save changes' button for edited message.
     * @returns {String} element locator
     */
    getSaveChangesBtn(){
        return  cy.contains('Save Changes')
    }

    /**
     * returns a locator for 'delete message' option which is displayed on click of more actions shortcut for message.
     * @returns {String} element locator
     */
    getDeleteMessageOption(){
        return cy.get('button[data-qa="delete_message"]')
    }

    /**
     * returns a locator for 'delete message' confirmation text
     * @returns {String} element locator
     */
    getDeleteMsgTxt(){
        return cy.get('div[data-qa="dialog_body"]>div>div>div>div[data-qa="message_content"]>div')
    }
    
    /**
     * returns  a locator for detete button
     * @returns {String} element locator
     */
    getDeleteBtn(){
        return cy.contains('.c-button--focus-visible', 'Delete', { timeout: 10000})
    }
}
export default messagePg;