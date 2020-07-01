/* 
* TC 05 - send messages to channel
* TC 17 - User should be able to send a message then edit the same
* TestData does not need reset. 
*/
/// <reference types="cypress" />
import {loginPg,channelPg,messagePg}  from '../../pageObjects'
import helper from '../../support/helper'

const loginPage = new loginPg()
const channelPage = new channelPg()
const msgPg = new messagePg()
const helpUtil = new helper()

before(function(){
    cy.fixture('TC01').then(function(data){
         this.data = data    
     })
})

describe('Channel',function(){    
   
    beforeEach(function(){
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
    })

    it('TC 05 & 17 - Sending Messages to Channel',function(){
        //Click on any channel from the list of existing channels
        var msgToBeSent = 'This is an automated message '+helpUtil.randomTextGenerator()
        channelPage.welcomeChannel.click()
        msgPg.sendMessage(msgToBeSent)
        msgPg.mostRecentMsg.should('contain',msgToBeSent)
        //Edit message
        msgPg.editMessage(msgToBeSent)
        //delete message
        msgPg.deleteMessage()
    })
})