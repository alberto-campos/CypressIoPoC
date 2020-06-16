class statusPg{
    getTeamMenuStatus(){
        return cy.get('button[data-qa="main-menu-custom-status-item"]')
    }

    getSetStatusDialogHeader(){
        return cy.get('.c-sk-modal_title_bar__text>h1')
    }

    getWhatsYourStatus(){
        return cy.get('.p-custom_status_modal__input')
    }

    getStatus_InAMeeting(){
        return cy.get('.p-custom_status_modal__preset_text')
    }

    getSelectDurationBtn(){
        return cy.get('div.c-select_button__content+i')
    }

    getSelectDurationList(){
        return cy.get('.c-select_options_list__option_label')
    }

    getSaveStatusBtn(){
        return cy.get('.c-button--primary')
    }

    getCalenderIcon(){
        return cy.get('.p-ia__sidebar_header__user > .c-custom_status > .c-emoji > img')
    }

    getStatusToolTop(){
        return cy.get('span.c-custom_status__tooltip')
    }
}
export default statusPg;