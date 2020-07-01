/**
 * This class refers to all objects wrt send message, edit message , delete message etc.
 */
import helper from '../support/helper'

const helpUtil = new helper()

class messagePg {
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

    get secondLastMsg(){
        return cy.get('[data-qa="virtual-list-item"]:nth-last-child(-n+2)').last()
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
     * returns a locator for search for the message input
     * @returns {String} element locator
     */
    get srchMsgInput(){
        return cy.get('[data-qa="top_nav_search"]')
    }

    /**
     * returns a locator for first search suggestion
     * @returns {String} element locator
     */
    get firstSearchSuggestion(){
        return cy.get('[data-id="c-search_autcomplete__suggestion_0"]')
    }

    /**
     * returns a locator for search spinning wheel
     * @returns {String} element locator
     */
    get srchSpinningWheel(){
        return cy.get('.c-infinite_spinner__tail')
    }

     /**
     * returns a locator for first occurance of search result
     * @returns {String} element locator
     */
    get firstSearchResult(){
        return cy.get(':nth-child(1) > .c-message_group > .c-search_message')
    }

    /**
     * returns  a locator for channel name displayed on top corner of any conversation
     * @returns {String} element locator
     */
    get channelNameOfConversation(){
        return cy.get('[data-qa="channel_name"]')
    }

    // File upload related objects
    /**
     * returns a locator for send text button on conversations
     * @returns {String} element locator
     */
    get sendTxtBtn(){
        return  cy.get('[data-qa="texty_send_button"]')
    }

    /**
     * returns a locator for mesage meta text displayed near message on conversations
     * @returns {String} element locator
     */
    get messageMetaText(){
        return cy.get('.c-message_kit__file__meta__text > span')
    }

    //Add reaction related objects
    /**
     * returns a locator for 'add reaction' button displayed when mouseover on any message.
     * @returns {String} element locator
     */
    get addReactionBtn(){
        return cy.get('[data-qa="add_reaction_action"]')
    }

    /**
     * returns a locator for emoji pickover popup displayed when clicked on Add reaction button on any message.
     * @returns {String} element locator
     */
    get emojiPickerPopover(){
        return cy.get('[data-qa="emoji-picker"]')
    }

    /**
     * returns a locator for grinning emoji displayed when clicked on Add reaction button on any message.
     * @returns {String} element locator
     */
    get grinningEmoji(){
        return cy.get('button[aria-label="grinning emoji"]').eq(0)
    }

    /**
     * returns a locator for reacted emoji on any message.
     * @returns reactedEmoji{String} element locator
     */
    get reactedEmoji(){
        return cy.get('[data-qa="reactji"]').eq(0)
    }

    /**
     * returns a locator for 'add emoji' button for messagee.
     * @returns {String} element locator
     */
    get addEmojiBtn(){
        return cy.get('[data-qa="texty_emoji_button"]')
    }

    /**
     * returns a locator for recent emoji message in the conversation.
     * @returns {String} element locator
     */
    get emojiMessage(){
        return cy.get('.p-rich_text_section > .c-emoji').last()
    }

    /**
     * Sends message to a user directly or on channel
     * @param {String} msg - message to be sent
     */
    sendMessage(msg){
        this.msgInput.type(msg)
        this.msgInput.type('{enter}')
    }

    /**
     * Edits the most recent message in conversation.
     * Message is appended with alphanumeric string returned by randomTextGenerator() function to generate new edited message and sent 
     * again to a user or channel
     */
    editMessage(msg) {
            cy.wait(1000)
            this.mostRecentMsg.should('contain',msg).trigger('mouseover') //MouseHover on last message
            this.moreActions.should('be.visible').click() //click on more actions
            this.editMessageOption.click() 
            var editStr = helpUtil.randomTextGenerator()
            this.editMsgInput.type(editStr)  //appending msg with random value
            this.saveChangesBtn.click()

            //Verify Edited Message
            this.mostRecentMsg.should('contain',editStr)
    }

    /**
     * Deletes the most recent message in the conversation of a  user or Direct channel
     */
    deleteMessage(){
        cy.wait(1000)
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
        this.deleteBtn.should('not.exist')
        this.mostRecentMsg.should('not.contain',msgToDelete)
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