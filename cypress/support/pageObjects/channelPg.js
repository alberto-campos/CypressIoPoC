//This page refers to all the activities wrt Channels. E.g. Craete Channel
class channelPg{
    addChannelsPlusIcon(){
        return cy.get('#sectionHeading-custom-L015CCG72QZ > div > div > button')
    }

    getCreateChannel(){
        return cy.contains('Create a channel')
    }

    getChannelName(){
        return cy.get('#channel-name')
    }

    getChannelDescription(){
        return cy.get('#channel_create_modal_purpose')
    }

    CreateBtn(){
        return cy.get('.c-sk-modal_footer_actions')
    }

    getChannelNameInputError(){
        return cy.get('.p-channel_name_input__label_error')
    }

    getAddPeopleHeading(){
        return cy.get('.c-sk-modal_title_bar__text > h1')
    }

    getAddPeopleInput(){
        return cy.get('#channel_invite_modal_select')
    }

    getDoneBtn(){
        return cy.contains('Done')
    }

    getWelcomeChannel(){
        return cy.get('span[data-qa="channel_sidebar_name_welcome"]')
    }

}
export default channelPg;