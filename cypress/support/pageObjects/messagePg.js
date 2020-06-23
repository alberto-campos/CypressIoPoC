/**
 * This class refers to all objects wrt send message, edit message , delete message etc.
 */
import baseTest from '../baseTest'
import helper from '../baseTest'

const helpUtil = new helper()

class messagePg extends baseTest{
    /**
     * returns a locator Direct Messages dialog header text
     * @returns {String} element locator
     */
    get directMessagesHeading(){
        return cy.get('.c-sk-modal_title_bar__text > h1')
    }

    /**
     * returns a locator for find user search input
     * @returns {String} element locator
     */
    get findUserInput(){
        return cy.get('#dm-browser')
    }

    /**
     * returns a locator for 'Go' button to search user
     * @returns {String} element locator
     */
    get goBtn(){
        return cy.get('.p-dm_browser_modal__controls > .c-button')
    }

    /**
     * returns a locator for message input
     * @returns {String} element locator
     */
    get msgInput(){
        return cy.get('.p-message_input_field > #undefined > p')
    }

    /**
     * returns a locator for most recent message displayed in the conversation
     * @returns {String} element locator
     */
    get mostRecentMsg(){
        return cy.get('div.c-message_kit__hover').last()
    }

    /**
     * returns a locator for message shortcuts->More ACtions button
     * @returns {String} element locator
     */
    get moreActions(){
        return cy.get('div[class="c-message_actions__container c-message__actions"]>button').last()
    }

    /**
     * returns a locator for 'edit message' option which is displayed on the click of more actions shortcut of messages.
     * @returns {String} element locator
     */
    get editMessageOption(){
        return cy.contains('Edit message')
    }

    /**
     * returns a locator for message input for editing
     * @returns {String} element locator
     */
    get editMsgInput(){
        return cy.get('.c-message__editor__input > #undefined > p')
    }

    /**
     * returns a locator for 'Save changes' button for edited message.
     * @returns {String} element locator
     */
    get saveChangesBtn(){
        return  cy.contains('Save Changes')
    }

    /**
     * returns a locator for 'delete message' option which is displayed on click of more actions shortcut for message.
     * @returns {String} element locator
     */
    get deleteMessageOption(){
        return cy.get('button[data-qa="delete_message"]')
    }

    /**
     * returns a locator for 'delete message' confirmation text
     * @returns {String} element locator
     */
    get deleteMsgTxt(){
        return cy.get('div[data-qa="dialog_body"]>div>div>div>div[data-qa="message_content"]>div')
    }
    
    /**
     * returns  a locator for detete button
     * @returns {String} element locator
     */
    get deleteBtn(){
        return cy.contains('.c-button--focus-visible', 'Delete', { timeout: 10000})
    }

    /**
     * Sends message to a user directly or on channel
     */
    sendMessage(){
        this.msgInput.type('Hi,This is an automated message.Have a nice day!')
        this.msgInput.type('{enter}')
    }

    /**
     * Edits the most recent message in conversation.
     * Message is appended with alphanumeric string returned by randomTextGenerator() function to generate new edited message and sent 
     * again to a user or channel
     */
    editMessage() {
            this.mostRecentMsg.trigger('mouseover') //MouseHover on last message
            this.moreActions.click() //click on more actions
            this.editMessageOption.click() 
            var editStr = helpUtil.randomTextGenerator()
            this.editMsgInput.type(editStr)  //appending msg with random value
            this.saveChangesBtn.click()

            //Verify Edited Message
            this.mostRecentMsg.invoke('text').then((text => {
            expect(text.trim()).to.contain('Hi,This is an automated message.Have a nice day!'+editStr)
            }))
    }

    /**
     * Deletes the most recent message in the conversation of a  user or Direct channel
     */
    deleteMessage(){
        /*cy.server()
        cy.route({
            method:'DEPOSTLETE',
            url: '/api/chat.delete'
        }).as('deleteMsg')*/
        this.mostRecentMsg.trigger('mouseover') //MouseHover on last message
        cy.waitForElementToBeVisible(this.MoreActions)
        this.moreActions.click()  //click on more actions
        this.deleteMessageOption.click() //click on delete message

        var msgToDelete
        this.deleteMsgTxt.then(function(deleteMsg){
            cy.log('Message to be deleted :'+deleteMsg.text())
            msgToDelete = deleteMsg.text()
        })
        this.deleteBtn.click() //click on delete message  
        cy.wait(2000)
        /*cy.wait('@deleteMsg') 
        cy.get('@deleteMsg').then((xhr)=>{
            expect(xhr.status).to.eq(200)
        }) */ 
        
        this.mostRecentMsg.then(function(msgLocator){
            expect(msgLocator.text()).to.not.contain(msgToDelete)
        })
    }

    /**
     * Search and Select User for Direct Messaages
     * @param {String} user - user to be searched
     */
    searchAndSelectUser(user){
        cy.get('.ReactVirtualized__Grid__innerScrollContainer').find('.p-dm_browser_modal__option').each(($el,index, $list)=>{
        const userName = $el.find('div.c-base_entity__text-contents>span>span>span').text()
            if(userName.includes(user)){
                $el.click()
            }
        })
    }
}
export default messagePg;