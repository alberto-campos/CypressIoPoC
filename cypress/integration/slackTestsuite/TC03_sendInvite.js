/// <reference types="cypress" />
import invitePeoplePg from '../../support/pageObjects/invitePeoplePg'
import slackHomePage from '../../support/pageObjects/slackHomePg'

describe('Slack Regression',function(){

    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it('TC03 Send Invite',function(){
        const invitePg = new invitePeoplePg()
        const homePg = new slackHomePage()

        //Login into Slack
        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)

        //Invite People
        homePg.getInvitePeopleLink().scrollIntoView().should('be.visible')
        homePg.getInvitePeopleLink().click()
        homePg.getMembersLink().click()
            
        //Verify the "Invite people to" dialog box content/web elements
        invitePg.getInviteeEmailInput1().should('be.visible')
        invitePg.getSendInvitationsBtn().should('be.visible')

        //Send Invite to unique email addresses
        invitePg.getAddManyAtOnceLink().click()  
        for (var i=0;i<this.data.NumberOfUsers;i++){
            cy.randomTextGenerator().then(function(returned_value){
              var emailID = "lgontijo+"+returned_value+"@slack-corp.com"  //appending msg with random value
              cy.log(emailID)
              invitePg.getBulkInviteInput().type(emailID)
              invitePg.getBulkInviteInput().type(',')
            })
        }
        
        invitePg.getAddInviteesBtn().click()
        invitePg.getSendInvitationsBtn().click()

        //Validate invitations sent text
        invitePg.getInvitesSentMsg().then(function (msgLocator){
          expect(msgLocator.text().trim()).to.contain("You’ve invited "+this.data.NumberOfUsers+" Members to your workspace")
        })

        invitePg.getDoneBtn().click()

      })
}
)