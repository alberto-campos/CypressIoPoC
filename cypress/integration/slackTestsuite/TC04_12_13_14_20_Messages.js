/* 
* TC 04 - Send Direct Messages - User sends a direct message to another user , edits the send message and deletes the sent message
* TC 12 - Search Messages - Users are able to send and search for a msg using slacks searching tool
* TC 13 - Uploads - Users are able to upload videos, images and documents via the attachment button
* TC 14 - Reactions - Users are able to react and remove reactions to messages by clicking on the add reaction button
* TC 20 - send emoji - Select emoji from the emoji picker then send it as message
* TestData need reset - TC13.
*/
/// <reference types="cypress" />
import messagePg from  '../../support/pageObjects/messagePg'
import slackHomePg from '../../support/pageObjects/slackHomePg'
import loginPg from '../../support/pageObjects/loginPg'
import channelPg from '../../support/pageObjects/channelPg'
import helper from '../../support/helper'

const msgPg = new messagePg()
const homePg = new slackHomePg()
const loginPage = new loginPg()
const channelPage = new channelPg()
const helpUtil = new helper()

describe('Messages',function(){
    beforeEach(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it('TC 04 - Send Direct Messages',function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
        
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

    it('TC 12 - Search Messages',function(){   
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
        var keyword = 'Good morning Java'

        //send a message in a public channel  - 'welcome'
        channelPage.welcomeChannel.click()
        msgPg.sendMessage(keyword)

        //search for the message using the search feature
        msgPg.srchMsgInput.type(keyword).then((dothis)=>{
            msgPg.srchSuggestionList.should('be.visible').click()
            msgPg.srchResults.contains(keyword).eq(0).click()
        })    

        //click on message in the search results and verify user is taken back to channel where message was originally sent
        msgPg.channelNameOfConversation.invoke('text').should('eq','welcome')
    })

    it('TC 14 - react to messages', function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)

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

    it('TC 20 - Send emoji', function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
        channelPage.welcomeChannel.click() //navigate to a channel
        msgPg.addEmojiBtn.click() //Click on emoji btn in msg composer
        msgPg.emojiPickerPopover.should('be.visible') 
        msgPg.grinningEmoji.click({force: true}) //click on any emoji
        msgPg.sendTxtBtn.click() //send the message
        msgPg.emojiMessage.should('be.visible')
    })

    it('TC 13 - Upload file to messages', function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)

        //navigate to a public channel
        channelPage.welcomeChannel.click()
        msgPg.msgInput.attachFile('tea.jpg', { subjectType: 'drag-n-drop' });
        msgPg.sendTxtBtn.click()
        msgPg.messageMetaText.should('have.text','tea.jpg')
    })

    after(function(){
        msgPg.deleteMessage()
    })
})