/* 
* TC 03 - Send Invite - Slack user send the invite to multiple email addresses for 2 or more channels
* TC 06 - Resend Invite - Slack user resend the ivite
* Tc 09 - Revoke Invite - Slack user revoke the invite
* TC 03 & 06 TestData doesnt need reset.
*/
/// <reference types="cypress" />
import invitePeoplePg from '../../support/pageObjects/invitePeoplePg'
import slackHomePage from '../../support/pageObjects/slackHomePg'
import adminPg from '../../support/pageObjects/adminPg'
import helper from '../../support/helper'

const invitePg = new invitePeoplePg()
const homePg = new slackHomePage()
const adminPage = new adminPg()
const helperPg = new helper()

describe('TC03 Send invite ,TC06 resend invite , TC 07 revoke invite',function(){

    beforeEach(function(){
      cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    /*it('Send Invite',function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)

        //Invite People
        homePg.getShowLessLink().click() 
        homePg.getInvitePeopleLink().click()
        homePg.getMembersLink().click()
            
        //Verify the "Invite people to" dialog box content/web elements
        invitePg.getInviteeEmailInput1().should('be.visible')
        invitePg.getSendInvitationsBtn().should('be.visible')

        //Send Invite to unique email addresses
        invitePg.getAddManyAtOnceLink().click()  
        for (var i=0;i<this.data.NumberOfUsers;i++){
              //cy.myproject.randomTextGenerator().then(function(returned_value){
              var emailID = "lgontijo+"+helperPg.randomTextGenerator()+"@slack-corp.com"  //appending msg with random value
              invitePg.getBulkInviteInput().type(emailID)
              invitePg.getBulkInviteInput().type(',')
            //})
        }
        
        invitePg.getAddInviteesBtn().click()
        invitePg.getSendInvitationsBtn().click()

        //Validate invitations sent text
        invitePg.getInvitesSentMsg().then(function ($msg){
          expect($msg.text().trim()).to.contain("You’ve invited "+this.data.NumberOfUsers+" Members to your workspace")
        })
        invitePg.getDoneBtn().click()
    })

    it('resend Invite',function(){
        //Login into Slack
        var url = Cypress.env('url1')
        cy.visit(url)
        cy.slackLoggingIn(this.data.email,this.data.password)

        // Team Menu Page
        homePg.getTeamHeaderMenu().click()
        cy.searchTeamMenu('Settings & administration')
        cy.searchTeamSubMenu('Manage members')

        // Admin- manage members page
        adminPage.getManageMembersHeader().then(($eleHeader => {
            expect($eleHeader.text().trim()).to.contain('Manage members')
        }))     

        //Search member to resend invite
        adminPage.getAdminMemberSrchInput().click().type(this.data.userForResendInvite)
        cy.get('c-table_view_spinner_overlay',{timeout: 10000}).should('not.be.visible')
        adminPage.getMemberEmailLocator().then(function($memberEmail){
            const memberMail = $memberEmail.text()
            if(memberMail.includes(this.data.userForResendInvite)){
                adminPage.getAdminMemberTblMenuBtn().click()
                adminPage.getAdminMemberTblMenuOptions().each(($el, index, $list) => {  //Verify options
                    var menuoption=$el.text()
                    if(index==0){
                    expect(menuoption.trim()).to.contain('Edit info')}
                    if(index==1){
                    expect(menuoption.trim()).to.contain('Resend invitation')}
                    if(index==2){
                    expect(menuoption.trim()).to.contain('Change account type')}
                    if(index==3){
                    expect(menuoption.trim()).to.contain('Revoke invitation')}
                })
                adminPage.getResendInvitationOption().click()
            }
        })
    })*/

    it('revoke Invite',function(){

        //Login into Slack
        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)

        // Team Menu Page
        homePg.getTeamHeaderMenu().click()
        cy.searchTeamMenu('Settings & administration')
        cy.searchTeamSubMenu('Manage members')

        // Admin- manage members page
        adminPage.getManageMembersHeader().then(($eleHeader => {
            expect($eleHeader.text().trim()).to.contain('Manage members')
        }))     

        
        //search memeber
        adminPage.getAdminMemberSrchInput().click().type(this.data.userForRevokeInvite)
        helperPg.waitForElementToBeVisible(adminPage.getAdminMemberTblMenuBtn().eq(0))
        adminPage.getAdminMemberTblMenuBtn().eq(0).should('be.visible').click()
        adminPage.getRevokeInvitationOption().click()

        //verify if Deactivate member? dialogues is visible
        adminPage.getDeactivateConfirmationDialogHeader().contains('Deactivate').should('be.visible')
        adminPage.getDeactivateBtn().click()   
        
       /*cy.get('.p-admin_member_table__row__display_name_and_email').each(($el,index, $list)=>{
         if($el.text().includes(this.data.userForRevokeInvite)){

         }*/
    })

    after(function(){
       //Reactivate account again for next usage of Revoke Invitation test case
         adminPage.getDeactivateConfirmationDialogHeader().should('not.be.visible')
         cy.get('.c-toast_wrapper').should('not.be.visible')
         helperPg.waitForElementToBeVisible(adminPage.getAdminMemberTblMenuBtn().eq(0))
         adminPage.getAdminMemberTblMenuBtn().eq(0).should('be.visible').click()
         adminPage.getActivateAccountOption().click()
    })
})