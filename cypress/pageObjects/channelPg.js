/**
 * This class refers to all the activities wrt Channels. E.g. Craete Channel
 */
class channelPg {
    /**
     * returns a locator for 'add channels' plus icon
     * @returns {String} element locator
     */
    get addChannelsPlusIcon(){
        return cy.get('#sectionHeading-custom-L015CCG72QZ > div > div > button')
    }

    /**
     * returns a locator for 'Create a channel' which appears when one clicks on 'add Channel's + icon
     * @returns {String} element locator
     */
    get createChannel(){
        return cy.contains('Create a channel')
    }

    /**
     * returns a locator for 'Channel Name' textbox on Create Channel Dialog
     * @returns {String} element locator
     */
    get channelNameTxtbox(){
        return cy.get('#channel-name')
    }

    /**
     * returns a locator for 'Channel Description' textbox on Create Channel Dialog
     * @returns {String} element locator
     */
    get channelDescriptionTxtbox(){
        return cy.get('#channel_create_modal_purpose')
    }

    /**
     * returns a locator for 'Create' button on Create Channel Dialog
     * @returns {String} element locator
     */
    get createBtn(){
        return cy.get('.c-sk-modal_footer_actions')
    }

    /**
     * returns a locator for error labelgenerated when user enters more than 80 characters in the channel name
     * @returns {String} element locator
     */
    get channelNameInputError(){
        return cy.get('.p-channel_name_input__label_error')
    }

    /**
     * returns a locator for header of Add People dialog
     *  @returns {String} element locator
     */
    get addPeopleHeading(){
        return cy.get('.c-sk-modal_title_bar__text > h1')
    }

    /**
     * returns a locator for Add people Inputbox
     *  @returns {String} element locator
     */
    get addPeopleInput(){
        return cy.get('#channel_invite_modal_select')
    }

    /**
     * returns a locator for Done Button
     *  @returns {String} element locator
     */
    get doneBtn(){
        return cy.contains('Done')
    }

    /**
     * returns a locator for 'skip for now' Button
     *  @returns {String} element locator
     */
    get skipForNowBtn(){
        return cy.get('[data-qa="invite_to_workspace_skip_button"]')
    }

    /**
     * returns a locator for channel named 'welcome'
     *  @returns {String} element locator
     */
    get welcomeChannel(){
        return cy.get('[data-qa="channel_sidebar_name_welcome"]')
    }

    // Objects for Delete Channel Functionality
    /**
     * returns a locator for 'Additional Options', which appears on right click of any channel name
     *  @returns {String} element locator
     */
    get additionalOptionsChannel(){
        return cy.get('[data-qa="channel_ctx_menu_more_options"]')
    }

    /**
     * returns a locator for 'Delete Channel', on Additional Options page
     *  @returns {String} element locator
     */
    get deleteChannelOption(){
        return cy.get('[data-qa="delete"]')
    }

    /**
     * returns a locator for 'Delete' Checkbox which has label 'Yes, permanently delete this channel'
     *  @returns {String} element locator
     */
    get deleteChkbox(){
        return cy.get('#delete_channel_cb')
    }

    /**
     * returns a locator for 'Delete Channel' button
     *  @returns {String} element locator
     */
    get deleteChannelBtn(){
        return cy.get('[data-qa="create_action"]')
    }

    /**
     * returns a locator for loading indicator which appears while adding a member to the channel
     *  @returns {String} element locator
     */
    get loadingStatusMsg(){
        return cy.get('.c-select_options_list__loading_state_message')
    }

    /**
     * returns a locator for channel details button on Channel page
     *  @returns {String} element locator
     */
    get channelDetailIcon(){
        return cy.get('[data-qa="channel-details"]')
    }

    /**
     * returns a locator for channel details  - More actions button on Channel page
     *  @returns {String} element locator
     */
    get channelDetailsMoreBtn(){
        return cy.get('[data-qa="channel-details-action"]')
    }

    /**
     * returns a locator for channel details  - More actions button on Channel page
     *  @returns {String} element locator
     */
    get channelAdditionalOptionsBtn(){
        return cy.get('[data-qa="menu_item_button"]').contains('Additional options')
    }

    /**
     * returns a locator for channel call button on Channel page
     *  @returns {String} element locator
     */
    get channelCallBtn(){
        return cy.get('[data-qa="call"]')
    }

    /**
     * returns a locator for start call button on Channel page
     *  @returns {String} element locator
     */
    get startCallBtn(){
        return cy.get('.c-button--primary').contains('Start Call')
    }

    //---------------locators for External Shared channel------------------------------------------------------
    /**
     * returns a locator for 'Share Channel' button
     *  @returns {String} element locator
     */
    get shareChannelBtn(){
        return cy.get('[data-qa="options-list-share-external"]')
    }

    /**
     * returns a locator for 'Share Channel' button on Share channel dialogue
     *  @returns {String} element locator
     */
    get shareChannelBtn2(){
        return cy.get('.c-button').contains('Share Channel')
    }

    /**
     * returns a locator for 'Add email address' input on Share channel dialogue
     *  @returns {String} element locator
     */
    get emailInputforChannelShare(){
        return cy.get('[data-qa="email_tokenizer_input-input"]')
    }

    /**
     * returns a locator for 'send' button for input  email on Share channel dialogue
     *  @returns {String} element locator
     */
    get sharedChannelSendBtn(){
        return cy.get('[data-qa="shared_channel_modal_send_button"]')
    }

    /**
     * returns a locator for 'success/done' button on Share channel dialogue
     *  @returns {String} element locator
     */
    get sharedChannelSuccessBtn(){
        return cy.get('.c-button').eq(0)
    }
    //------------------------Functions for channel page-------------------------------------------------------------
    /**
     * Deletes the given channel.
     * @param {String} channelName - channel to be deleted
     */
    deleteChannel(channelName) {
        var channelLocator = "span[data-qa='channel_sidebar_name_"+channelName+"']"
        cy.get(channelLocator).scrollIntoView().rightclick()
        this.additionalOptionsChannel.click()
        this.deleteChannelOption.click()
        this.deleteChkbox.click()
        this.deleteChannelBtn.click()       
    }

}
export default channelPg;