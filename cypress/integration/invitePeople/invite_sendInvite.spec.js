/* 
* TC 03 - Send Invite - Slack user send the invite to multiple email addresses for 2 or more channels
* TestData does not need reset. 
*/
/// <reference types="cypress" />
import {loginPg,slackHomePg,invitePeoplePg}  from '../../pageObjects'
import helper from '../../support/helper'

const loginPage = new loginPg()
const homePg = new slackHomePg()
const invitePg = new invitePeoplePg()
const helpUtil = new helper()

before(function(){
    cy.fixture('TC01').then(function(data){
         this.data = data    
     })
})

describe('invite People',function(){    
    beforeEach(function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
    })

    it('TC 03 - Send Invite',function(){
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
})