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
import loginPg from '../../support/pageObjects/loginPg'

const loginPage = new loginPg()
const invitePg = new invitePeoplePg()
const homePg = new slackHomePage()
const adminPage = new adminPg()
const helpUtil = new helper()

describe('TC03 Send invite ,TC06 resend invite , TC 07 revoke invite',function(){

    beforeEach(function(){
      cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it('Send Invite',function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)

        //Invite People
        homePg.showLessLink.click() 
        homePg.invitePeopleLink.click()
        homePg.membersLink.click()
            
        //Verify the "Invite people to" dialog box content/web elements
        invitePg.inviteeEmailInput1.should('be.visible')
        invitePg.sendInvitationsBtn.should('be.visible')

        //Send Invite to unique email addresses
        invitePg.addManyAtOnceLink.click()  
        for (var i=0;i<this.data.NumberOfUsers;i++){
              var emailID = "lgontijo+"+helpUtil.randomTextGenerator()+"@slack-corp.com"  //appending msg with random value
              invitePg.bulkInviteInput.type(emailID)
              invitePg.bulkInviteInput.type(',')
        }
        
        invitePg.addInviteesBtn.click()
        invitePg.sendInvitationsBtn.click()

        //Validate invitations sent text
        invitePg.invitesSentMsg.then(function ($msg){
          expect($msg.text().trim()).to.contain("You’ve invited "+this.data.NumberOfUsers+" Members to your workspace")
        })
        invitePg.doneBtn.click()
    })

    it('resend Invite',function(){
        //Login into Slack
        var url = Cypress.env('url1')
        cy.visit(url)
        loginPage.slackLoggingIn(this.data.email,this.data.password)

        // Team Menu Page
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('Settings & administration')
        homePg.searchTeamSubMenu('Manage members')

        // Admin- manage members page
        adminPage.manageMembersHeader.then(($eleHeader => {
            expect($eleHeader.text().trim()).to.contain('Manage members')
        }))     

        //Search member to resend invite
        adminPage.adminMemberSrchInput.click().type(this.data.userForResendInvite)
        adminPage.tableViewLoadingSpinner.should('not.be.visible')
        adminPage.memberEmailLocator.then(function($memberEmail){
            const memberMail = $memberEmail.text()
            if(memberMail.includes(this.data.userForResendInvite)){
                adminPage.adminMemberTblBtn.click()
                adminPage.adminMemberTblMenuOptions.each(($el, index, $list) => {  //Verify options
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
                adminPage.resendInvitationOption.click()
            }
        })
    })

    it('revoke Invite',function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)

        // Team Menu Page
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('Settings & administration')
        homePg.searchTeamSubMenu('Manage members')

        // Admin- manage members page
        adminPage.manageMembersHeader.then(($eleHeader => {
            expect($eleHeader.text().trim()).to.contain('Manage members')
        }))     

        //search memeber
        adminPage.adminMemberSrchInput.click().type(this.data.userForRevokeInvite)
        cy.wait(2000)
        adminPage.adminMemberTblBtn.eq(0).click()
        adminPage.revokeInvitationOption.click()

        //verify if Deactivate member? dialogues is visible
        adminPage.deactivateConfirmationDialogHeader.contains('Deactivate').should('be.visible')
        adminPage.deactivateBtn.click()   

        //Reactivate account again for next usage of Revoke Invitation test case
        cy.wait(2000)
        adminPage.deactivateConfirmationDialogHeader.should('not.be.visible')
        cy.waitForElementToBeVisible(adminPage.adminMemberTblBtn.eq(0))
        adminPage.adminMemberTblBtn.eq(0).should('be.visible').click()
        adminPage.activateAccountOption.click()
    })

   /*after(function(){
         
    })*/
})