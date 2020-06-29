/* 
* TC 03 - Send Invite - Slack user send the invite to multiple email addresses for 2 or more channels
* TC 06 - Resend Invite - Slack user resend the ivite
* Tc 07 - Revoke Invite - Slack user revoke the invite
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

describe('Invite People',function(){

    beforeEach(function(){
      cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it.skip('TC 03 - Send Invite',function(){
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
        invitePg.invitesSentMsg.should('contain',"You’ve invited "+this.data.NumberOfUsers+" Members to your workspace")
        invitePg.doneBtn.click()
    })

    it('TC 06 - resend Invite',function(){
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
        adminPage.adminMemberSrchInput.click().type(this.data.userForResendInvite).then(function(doNext){
            adminPage.adminMemberSrchInput.type('{enter}')
            adminPage.tableViewLoadingSpinner.should('not.be.visible')
            adminPage.memberEmailLocator.should('contain',this.data.userForResendInvite)
                                        .should('have.length',1)
            adminPage.adminMemberTblBtn.click()
            adminPage.resendInvitationOption.click()
            adminPage.toastWrapper.should('not.exist')
        })
    })//it('resend Invite',function()

    it('TC 07 - revoke Invite',function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)

        // Team Menu Page
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('Settings & administration')
        homePg.searchTeamSubMenu('Manage members')

        // Admin- manage members page
        adminPage.manageMembersHeader.should('contain','Manage members')
        
        //search member
        adminPage.adminMemberSrchInput.click().type(this.data.userForRevokeInvite)
        adminPage.adminMemberSrchInput.type('{enter}')
        adminPage.tableViewLoadingSpinner.should('not.exist')
        adminPage.memberEmailLocator.should('contain',this.data.userForRevokeInvite)
                                    .should('have.length',1)
        adminPage.adminMemberTblBtn.click({force:true})
        adminPage.revokeInvitationOption.click()

        //verify if Deactivate member? dialogue is visible
        adminPage.deactivateConfirmationDialogHeader.contains('Deactivate').should('be.visible')
        adminPage.deactivateBtn.click() 
    })

    after(function(){
        //Reactivate account again for next usage of Revoke Invitation test case
        adminPage.deactivateConfirmationDialogHeader.should('not.be.exist')
        adminPage.memberEmailLocator.should('contain',this.data.userForRevokeInvite)
                                    .should('have.length',1)
        adminPage.toastWrapper.should('not.exist')
        adminPage.adminMemberTblBtn.click({force:true})
        adminPage.activateAccountOption.click()
    })
})