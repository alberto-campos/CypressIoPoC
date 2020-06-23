/* 
* TC 04 - Send Direct Messages -User sends a direct message to another user , edits the send message and deletes the sent message
* TestData doesnt need reset.
*/
/// <reference types="cypress" />
import messagePg from  '../../support/pageObjects/messagePg'
import slackHomePg from '../../support/pageObjects/slackHomePg'
import loginPg from '../../support/pageObjects/loginPg'

describe('TC04 Send Direct Messages',function(){

    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it('Send Direct Messages',function(){
        const msgPg = new messagePg()
        const homePg = new slackHomePg()
        const loginPage = new loginPg()

        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
        
        //Click on Direct msg + icon
        homePg.directMsgIcon.click()

        //Direct Messages Dialog - send message
        msgPg.directMessagesHeading.should('contain.text','Direct Messages')
        msgPg.findUserInput.type(this.data.user)
        cy.wait(2000)
        msgPg.searchAndSelectUser(this.data.user)
        msgPg.goBtn.click()
        msgPg.sendMessage()
        cy.wait(2000)

        //Edit message
        msgPg.editMessage()
       
        //delete message
        msgPg.deleteMessage()
    })
}
)