//This page refers to Team menu->View profile related objects.
class profilePg{
    getProfileWindowHeader(){
        return cy.get('.p-flexpane__title_container')
    }

    getMemberProfileMoreBtn(){
        return cy.get('button[data-qa="member_profile_more_btn"]>div')
    }

    getAccountSettingsMenuItem(){
        return cy.get('button[data-qa="menu_item_button"]>div').eq(1)
    }

    getEditProfileIcon(){
        return cy.get('button[data-qa="member_profile_edit_btn"]>i')
    }

    getEditProfileWindowHeader(){
        return cy.get('.p-edit_profile__title')
    }

    getFullNameInput(){
        return cy.get('#real_name-input')
    }

    getWhatIDoTxtbox(){
        return cy.get('input[id="title-input"]')
    }

    getPhoneNumberTxtBox(){
        return cy.get('input[id="phone-input"]')
    }

    getSaveChangesBtn(){
        return cy.contains('Save Changes')
    }

    getUpdatedProfileNameField(){
        return cy.get('.p-member_profile_field__value')
    }
}
export default profilePg;