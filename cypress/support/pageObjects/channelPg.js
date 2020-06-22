/**
 * This class refers to all the activities wrt Channels. E.g. Craete Channel
 */
class channelPg{
    /**
     * returns a locator for 'add channels' plus icon
     * @returns {String} element locator
     */
    addChannelsPlusIcon(){
        return cy.get('#sectionHeading-custom-L015CCG72QZ > div > div > button')
    }

    /**
     * returns a locator for 'Create a channel' which appears when one clicks on 'add Channel's + icon
     * @returns {String} element locator
     */
    getCreateChannel(){
        return cy.contains('Create a channel')
    }

    /**
     * returns a locator for 'Channel Name' textbox on Create Channel Dialog
     * @returns {String} element locator
     */
    getChannelNameTxtbox(){
        return cy.get('#channel-name')
    }

    /**
     * returns a locator for 'Channel Description' textbox on Create Channel Dialog
     * @returns {String} element locator
     */
    getChannelDescriptionTxtbox(){
        return cy.get('#channel_create_modal_purpose')
    }

    /**
     * returns a locator for 'Create' button on Create Channel Dialog
     * @returns {String} element locator
     */
    CreateBtn(){
        return cy.get('.c-sk-modal_footer_actions')
    }

    /**
     * returns a locator for error labelgenerated when user enters more than 80 characters in the channel name
     * @returns {String} element locator
     */
    getChannelNameInputError(){
        return cy.get('.p-channel_name_input__label_error')
    }

    /**
     * returns a locator for header of Add People dialog
     *  @returns {String} element locator
     */
    getAddPeopleHeading(){
        return cy.get('.c-sk-modal_title_bar__text > h1')
    }

    /**
     * returns a locator for Add people Inputbox
     *  @returns {String} element locator
     */
    getAddPeopleInput(){
        return cy.get('#channel_invite_modal_select')
    }

    /**
     * returns a locator for Done Button
     *  @returns {String} element locator
     */
    getDoneBtn(){
        return cy.contains('Done')
    }

    /**
     * returns a locator for channel named 'welcome'
     *  @returns {String} element locator
     */
    getWelcomeChannel(){
        return cy.get('[data-qa="channel_sidebar_name_welcome"]')
    }

    // Objects for Delete Channel Functionality
    /**
     * returns a locator for 'Additional Options', which appears on right click of any channel name
     *  @returns {String} element locator
     */
    getAdditionalOptionsChannel(){
        return cy.get('[data-qa="channel_ctx_menu_more_options"]')
    }

    /**
     * returns a locator for 'Delete Channel', on Additional Options page
     *  @returns {String} element locator
     */
    selectDeleteChannelOption(){
        return cy.get('[data-qa="delete"]')
    }

    /**
     * returns a locator for 'Delete' Checkbox which has label 'Yes, permanently delete this channel'
     *  @returns {String} element locator
     */
    checkDeleteChkbox(){
        return cy.get('#delete_channel_cb')
    }

    /**
     * returns a locator for 'Delete Channel' button
     *  @returns {String} element locator
     */
    getDeleteChannelBtn(){
        return cy.get('[data-qa="create_action"]')
    }

}
export default channelPg;