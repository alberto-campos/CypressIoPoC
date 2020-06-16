//This page refers to all objects wrt send message, edit message , delete message etc.
class messagePg{
    getDirectMessagesHeading(){
        return cy.get('.c-sk-modal_title_bar__text > h1')
    }

    getFindUserInput(){
        return cy.get('#dm-browser')
    }

    getGObtn(){
        return cy.get('.p-dm_browser_modal__controls > .c-button')
    }

    getMsgInput(){
        return cy.get('.p-message_input_field > #undefined > p')
    }

    getMostRecentMsg(){
        return cy.get('div.c-message_kit__hover').last()
    }

    getMoreActions(){
        return cy.get('div[class="c-message_actions__container c-message__actions"]>button').last()
    }

    getEditMessageOption(){
        return cy.contains('Edit message')
    }

    getEditMsgInput(){
        return cy.get('.c-message__editor__input > #undefined > p')
    }

    getSaveChangesBtn(){
        return  cy.contains('Save Changes')
    }

    getDeleteMessageOption(){
        return cy.get('button[data-qa="delete_message"]')
    }

    getDeleteMsgTxt(){
        return cy.get('div[data-qa="dialog_body"]>div>div>div>div[data-qa="message_content"]>div')
    }
    
    getDeleteBtn(){
        return cy.contains('.c-button--focus-visible', 'Delete', { timeout: 10000})
    }
}
export default messagePg;