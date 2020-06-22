//This class refers to all the activities wrt Channels. E.g. Craete Channel
class channelPg{
    /**
     * returns a locator for 'add channels' plus icon
     * @return {elementlocator}
     */
    addChannelsPlusIcon(){
        return cy.get('#sectionHeading-custom-L015CCG72QZ > div > div > button')
    }

    /**
     * returns a locator for 'Create a channel' which appears when one clicks on 'add Channel's + icon
     * @return {elementlocator}
     */
    getCreateChannel(){
        return cy.contains('Create a channel')
    }

    /**
     * returns a locator for 'Channel Name' textbox on Create Channel Dialog
     * @return {elementlocator}
     */
    getChannelNameTxtbox(){
        return cy.get('#channel-name')
    }

    /**
     * returns a locator for 'Channel Description' textbox on Create Channel Dialog
     * @return {elementlocator}
     */
    getChannelDescriptionTxtbox(){
        return cy.get('#channel_create_modal_purpose')
    }

    /**
     * returns a locator for 'Create' button on Create Channel Dialog
     * @return {elementlocator}
     */
    CreateBtn(){
        return cy.get('.c-sk-modal_footer_actions')
    }

    /**
     * returns a locator for error labelgenerated when user enters more than 80 characters in the channel name
     * @return {elementlocator}
     */
    getChannelNameInputError(){
        return cy.get('.p-channel_name_input__label_error')
    }

    /**
     * returns a locator for header of Add People dialog
     *  @return {elementlocator}
     */
    getAddPeopleHeading(){
        return cy.get('.c-sk-modal_title_bar__text > h1')
    }

    /**
     * returns a locator for Add people Inputbox
     *  @return {elementlocator}
     */
    getAddPeopleInput(){
        return cy.get('#channel_invite_modal_select')
    }

    /**
     * returns a locator for Done Button
     *  @return {elementlocator}
     */
    getDoneBtn(){
        return cy.contains('Done')
    }

    /**
     * returns a locator for channel named 'welcome'
     *  @return {elementlocator}
     */
    getWelcomeChannel(){
        return cy.get('[data-qa="channel_sidebar_name_welcome"]')
    }

    // Objects for Delete Channel Functionality
    /**
     * returns a locator for 'Additional Options', which appears on right click of any channel name
     *  @return {elementlocator}
     */
    getAdditionalOptionsChannel(){
        return cy.get('[data-qa="channel_ctx_menu_more_options"]')
    }

    /**
     * returns a locator for 'Delete Channel', on Additional Options page
     *  @return {elementlocator}
     */
    selectDeleteChannelOption(){
        return cy.get('[data-qa="delete"]')
    }

    /**
     * returns a locator for 'Delete' Checkbox which has label 'Yes, permanently delete this channel'
     *  @return {elementlocator}
     */
    checkDeleteChkbox(){
        return cy.get('#delete_channel_cb')
    }

    /**
     * returns a locator for 'Delete Channel' button
     *  @return {elementlocator}
     */
    getDeleteChannelBtn(){
        return cy.get('[data-qa="create_action"]')
    }

}
export default channelPg;