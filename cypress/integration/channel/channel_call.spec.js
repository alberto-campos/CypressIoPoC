/* 
* TC 15 - Users are able to start a channel call via the call button
* TestData does not need reset. 
*/
/// <reference types="cypress" />
import {loginPg,channelPg}  from '../../pageObjects'
import helper from '../../support/helper'

const loginPage = new loginPg()
const channelPage = new channelPg()

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

    it('TC 15 - channel call',function(){
        //Click on any channel from the list of existing channels
        channelPage.welcomeChannel.click()

        //Open the channel details& click on a phone icon to start a call
        channelPage.channelDetailIcon.click()
        channelPage.channelCallBtn.should('be.visible')
        //channelPage.startCallBtn.should('be.visible')
    })
})