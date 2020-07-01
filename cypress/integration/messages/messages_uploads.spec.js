/* 
* TC 13 - Uploads - Users are able to upload videos, images and documents via the attachment button
* TestData  need reset. 
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

    it('TC 13 - Upload file to messages', function(){
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