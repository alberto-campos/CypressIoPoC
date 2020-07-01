/* 
* TC 14 - Reactions - Users are able to react and remove reactions to messages by clicking on the add reaction button
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

    it('TC 14 - react to messages', function(){
        //navigate to a channel
        channelPage.welcomeChannel.click()

        //send a message
        msgPg.sendMessage('react to me!')
        msgPg.mostRecentMsg.should('contain','react to me!')
        cy.wait(2000)
        //Add & remove reaction to above message
        msgPg.mostRecentMsg.trigger('mouseover')
        msgPg.addReactionBtn.click()
        msgPg.emojiPickerPopover.should('be.visible')
        msgPg.grinningEmoji.click({force: true})
        msgPg.reactedEmoji.should('be.visible').click()       
    })
})