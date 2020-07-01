/* 
* TC 20 - send emoji - Select emoji from the emoji picker then send it as message
* TestData does not need reset. 
*/
/// <reference types="cypress" />
import {loginPg,channelPg,messagePg}  from '../../pageObjects'

const loginPage = new loginPg()
const channelPage = new channelPg()
const msgPg = new messagePg()

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

    it('TC 20 - Send emoji', function(){
        channelPage.welcomeChannel.click() //navigate to a channel
        msgPg.addEmojiBtn.click() //Click on emoji btn in msg composer
        msgPg.emojiPickerPopover.should('be.visible') 
        msgPg.grinningEmoji.click({force: true}) //click on any emoji
        msgPg.sendTxtBtn.click() //send the message
        msgPg.emojiMessage.should('be.visible')
    })
})