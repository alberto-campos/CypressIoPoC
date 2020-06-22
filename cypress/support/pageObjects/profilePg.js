
/**
 * This class refers to Team menu->View profile related objects.
 */
class profilePg{
    /**
     * returns a locator for text displayed on header of the Profile Window
     * @returns {String} element locator
     */
    getProfileWindowHeader(){
        return cy.get('.p-flexpane__title_container')
    }

    /**
     * returns a locator for 'more actions' button on member's profile
     * @returns {String} element locator
     */
    getMemberProfileMoreBtn(){
        return cy.get('button[data-qa="member_profile_more_btn"]>div')
    }

    /**
     * returns a locator for 'Account settings' option which appears when one clicked on 'more' btn in profile page.
     * @returns {String} element locator
     */
    getAccountSettingsMenuItem(){
        //return cy.get('button[data-qa="menu_item_button"]>div').eq(1)
        return cy.get('i[data-qa="menu_item_link_indicator"]')
    }

    /**
     * returns a locator for 'edit profile' pencil icon displayed in Profile section
     * @returns {String} element locator
     */
    getEditProfilePencilIcon(){
        return cy.get('button[data-qa="member_profile_edit_btn"]>i')
    }

    /**
     * returns a locator for text displayed in the heading of 'edit profile' window
     * @returns {String} element locator
     */
    getEditProfileWindowHeader(){
        return cy.get('.p-edit_profile__title')
    }

    /**
     * returns a locator for 'Full Name' input box displayed in Edit profile window
     * @returns {String} element locator
     */
    getFullNameInput(){
        return cy.get('#real_name-input')
    }

     /**
     * returns  a locator for 'What I Do' input box displayed in Edit profile window
     * @returns {String} element locator
     */
    getWhatIDoTxtbox(){
        return cy.get('input[id="title-input"]')
    }

    /**
     * returns a locator for 'Save Changes' button displayed in Edit profile window
     * @returns {String} element locator
     */
    getSaveChangesBtn(){
        return cy.contains('Save Changes')
    }

    /**
     * returns a locator for displayed name on profile window
     * @returns {String} element locator
     */
    getUpdatedProfileNameField(){
        return cy.get('.p-member_profile_field__value')
    }
}
export default profilePg;