class slackHomePg{
    getTeamHeaderMenu(){
        return cy.get('button[data-qa="team-menu-trigger"]>i')
    }

    getInvitePeopleLink(){
        return cy.get('span[data-qa="channel_sidebar_name_invite_people"]')
    }

    getMembersLink(){
        return cy.get('[data-qa="invite_member_link"] > .p-select_invite_type__option_member_type > .margin_0')
    }

    getDirectMsgIcon(){
        return cy.get('div[data-qa="direct_messages"]>div>button')
    }

}
export default slackHomePg;