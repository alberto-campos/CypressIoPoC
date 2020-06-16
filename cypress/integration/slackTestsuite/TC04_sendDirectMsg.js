/// <reference types="cypress" />
import messagePg from  '../../support/pageObjects/messagePg'
import slackHomePg from '../../support/pageObjects/slackHomePg'

describe('Slack Regression',function(){

    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it('TC04 Send Direct Messages',function(){
        const msgPg = new messagePg()
        const homePg = new slackHomePg()

        //Login into Slack
        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)

        //Click on Direct msg + icon
        homePg.getDirectMsgIcon().click()

        //Direct Messages Dialog - send message
        msgPg.getDirectMessagesHeading().should('contain.text','Direct Messages')
        msgPg.getFindUserInput().type(this.data.user)
        cy.wait(2000)
        cy.searchAndSelectUser(this.data.user)
        msgPg.getGObtn().click()
        cy.sendMessage()
        cy.wait(2000)

        //Edit message
        cy.editMessage()
       
        //delete message
        cy.deleteMessage()
    })
}
)