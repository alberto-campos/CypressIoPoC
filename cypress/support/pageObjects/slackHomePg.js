/**
 * This class refers to objects of Landing page for Slack login
 */
class slackHomePg{
    /**
     * returns an element locator for team menu sidebar icon
     * @returns {String} element locator
     */
    getTeamHeaderMenu(){
        return cy.get('button[data-qa="team-menu-trigger"]>i')
    }

    /**
     * returns a locator for 'Show Less' link on side menu bar of Slack home page.
     * @returns {String} element locator
     */
    getShowLessLink(){
        return cy.get('#sectionHeading-morePages > .c-button-unstyled')
    }

    /**
     * returns the element/elements locator for the team menu items
     * @returns {String} element locator
     */
    getTeamMenuItems(){
        return cy.get('button[data-qa="menu_item_button"]')
    }

    /**
     * returns the element/elements locator for the team sub menu items
     * @returns {String} element locator
     */
    getTeamSubMenuItems(){
        return cy.get('.c-menu_item__li>a')
    }

    /**
     * returns the link for Invite people field in Slack Homepage side menu.
     * @returns {String} element locator
     */
    getInvitePeopleLink(){
        return cy.get('span[data-qa="channel_sidebar_name_invite_people"]')
    }

    /**
     * returns the link for Members field on Slack Homepage when you click on Invite People link
     * @returns {String} element locator
     */
    getMembersLink(){
        return cy.get('[data-qa="invite_member_link"] > .p-select_invite_type__option_member_type > .margin_0')
    }

    /**
     * returns a locator for Direct Message Icon on Slack homepage
     * @returns {String} element locator
     */
    getDirectMsgIcon(){
        return cy.get('div[data-qa="direct_messages"]>div>button')
    }

    /**
     * returns a locator for Apps on Slack homepage
     * @returns {String} element locator
     */
    getAppsLink(){
        return cy.get('#p-pages_list__6 > .c-button-unstyled > .p-channel_sidebar__name')
    }

}
export default slackHomePg;