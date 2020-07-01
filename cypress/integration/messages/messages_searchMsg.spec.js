/* 
* TC 12 - Search Messages - Users are able to send and search for a msg using slacks searching tool
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

    it('TC 12 - Search Messages',function(){   
        //Login into Slack
        var keyword = 'Good morning Java'

        //send a message in a public channel  - 'welcome'
        channelPage.welcomeChannel.click()
        msgPg.sendMessage(keyword)

        //search for the message using the search feature
        msgPg.srchMsgInput.type(keyword).then((dothis)=>{
           msgPg.firstSearchSuggestion.should('be.visible').click()
           msgPg.srchSpinningWheel.should('not.be.visible')
           msgPg.firstSearchResult.should('contain',keyword).click({force:true})
           msgPg.firstSearchResult.should('not.be.visible')
        })    

        //click on message in the search results and verify user is taken back to channel where message was originally sent
        msgPg.channelNameOfConversation.should('be.visible').invoke('text').should('eq','welcome')
    })
})