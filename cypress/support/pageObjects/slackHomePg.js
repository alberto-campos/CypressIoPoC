/**
 * This class refers to objects of Landing page for Slack login
 */
import baseTest from '../baseTest'

class slackHomePg extends baseTest{
    /**
     * returns an element locator for team menu sidebar icon
     * @returns {String} element locator
     */
    get teamHeaderMenu(){
        return cy.get('button[data-qa="team-menu-trigger"]>i')
    }

    /**
     * returns a locator for 'Show Less' link on side menu bar of Slack home page.
     * @returns {String} element locator
     */
    get showLessLink(){
        return cy.get('#sectionHeading-morePages > .c-button-unstyled')
    }

    /**
     * returns the element/elements locator for the team menu items
     * @returns {String} element locator
     */
    get teamMenuItems(){
        return cy.get('button[data-qa="menu_item_button"]')
    }

    /**
     * returns the element/elements locator for the team sub menu items
     * @returns {String} element locator
     */
    get teamSubMenuItems(){
        return cy.get('.c-menu_item__li>a')
    }

    /**
     * returns the link for Invite people field in Slack Homepage side menu.
     * @returns {String} element locator
     */
    get invitePeopleLink(){
        return cy.get('span[data-qa="channel_sidebar_name_invite_people"]')
    }

    /**
     * returns the link for Members field on Slack Homepage when you click on Invite People link
     * @returns {String} element locator
     */
    get membersLink(){
        return cy.get('[data-qa="invite_member_link"] > .p-select_invite_type__option_member_type > .margin_0')
    }

    /**
     * returns a locator for Direct Message Icon on Slack homepage
     * @returns {String} element locator
     */
    get directMsgIcon(){
        return cy.get('div[data-qa="direct_messages"]>div>button')
    }

    /**
     * returns a locator for Apps on Slack homepage
     * @returns {String} element locator
     */
    get appsLink(){
        return cy.get('#p-pages_list__6 > .c-button-unstyled > .p-channel_sidebar__name')
    }

    /**
     * Searches team menu with given menu option and click on it.
     * @param {String} menuOption - menu item to be searched in Team menu.
     */
    searchTeamMenu(menuOption){
        this.teamMenuItems.contains(menuOption).click({ force: true })
    }

    /**
     * Searches team's submenu with given sub menu text and click on it.
     * Submenus open a new link in new window, which is handled in this function by opening them in the same original window
     * * @param {String} subMenuOption - sub menu item to be searched in Team's main menu.
     */
    searchTeamSubMenu(subMenuOption) {
        this.teamSubMenuItems.each(($el, index, $list) => {
            var opt = $el.find('div').text()
            if(opt.includes(subMenuOption)){
                this.teamSubMenuItems.eq(index).invoke('attr', 'href').then(href => {
                cy.visit(href)})
            }//if ends
        })
    }

}
export default slackHomePg;