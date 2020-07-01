/* 
* TC 04 - Send Direct Messages - User sends a direct message to another user , edits the send message and deletes the sent message
* TestData does not need reset. 
*/
/// <reference types="cypress" />
import {loginPg,slackHomePg,messagePg}  from '../../pageObjects'
import helper from '../../support/helper'

const loginPage = new loginPg()
const homePg = new slackHomePg()
const msgPg = new messagePg()
const helpUtil = new helper()

before(function(){
    cy.fixture('TC01').then(function(data){
         this.data = data    
     })
})

describe('Messages',function(){    
    beforeEach(function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
    })

    it('TC 04 - Send Direct Messages',function(){
        
        //Click on Direct msg + icon
        homePg.directMsgIcon.click()

        //Direct Messages Dialog - send message
        var msgToBeSent = 'This is automated message '+helpUtil.randomTextGenerator()
        msgPg.directMessagesHeading.should('contain.text','Direct Messages')
        msgPg.findUserInput.type(this.data.user)
        msgPg.searchAndSelectUser(this.data.user)
        msgPg.goBtn.click()
        msgPg.sendMessage(msgToBeSent)
        msgPg.mostRecentMsg.should('contain',msgToBeSent)
        //Edit message
        msgPg.editMessage(msgToBeSent)
        //delete message
        msgPg.deleteMessage()
    })
})