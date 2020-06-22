/**
 * This class refers to reusable functions specific to Slack application
 */
import messagePg from  '../support/pageObjects/messagePg'
import loginPg from  '../support/pageObjects/loginPg'
import slackHomePg from '../support/pageObjects/slackHomePg'
import adminPg from '../support/pageObjects/adminPg'
import channelPg from '../support/pageObjects/channelPg'
import helper from '../support/helper'

//Create objects for the imported Page objects.
const msgPg = new messagePg()
const loginPage = new loginPg()
const homePg = new slackHomePg()
const adminPage = new adminPg()
const channelPage = new channelPg() 
const helperPg = new helper()

  /**
   * Login into slack application
   * @param {String} userName - valid userName of slack.
   * @param {String} pwd - valid password for the user.
   */
    Cypress.Commands.add("slackLoggingIn", (userName, pwd) => {
      loginPage.getUsername().type(userName)
      loginPage.getPassword().click({force: true })
      loginPage.getPassword().type(pwd)
      loginPage.SignInBtn().click({ force: true })
    })

  /**
   * Search and Select User for Direct Messaages
   * @param {String} user - user to be searched
   */
    Cypress.Commands.add("searchAndSelectUser", (user) => {
      cy.get('.ReactVirtualized__Grid__innerScrollContainer').find('.p-dm_browser_modal__option').each(($el,index, $list)=>{
        const userName = $el.find('div.c-base_entity__text-contents>span>span>span').text()
        if(userName.includes(user)){
            $el.click()
        }
      })
    })

  /**
   * Sends message to a user directly or on channel
   */
    Cypress.Commands.add("sendMessage", () => {
      msgPg.getMsgInput().type('Hi,This is an automated message.Have a nice day!')
      msgPg.getMsgInput().type('{enter}')
    })

  /**
   * Edits the most recent message in conversation.
   * Message is appended with alphanumeric string returned by randomTextGenerator() function to generate new edited message and sent 
   * again to a user or channel
   */
    Cypress.Commands.add("editMessage", () => {
          msgPg.getMostRecentMsg().trigger('mouseover') //MouseHover on last message
          msgPg.getMoreActions().click() //click on more actions
          msgPg.getEditMessageOption().click() 
          var editStr = helperPg.randomTextGenerator()
          msgPg.getEditMsgInput().type(editStr)  //appending msg with random value
          msgPg.getSaveChangesBtn().click()

          //Verify Edited Message
          msgPg.getMostRecentMsg().invoke('text').then((text => {
          expect(text.trim()).to.contain('Hi,This is an automated message.Have a nice day!'+editStr)
          }))
    })

  /**
   * Deletes the most recent message in the conversation of a  user or Direct channel
   */
    Cypress.Commands.add("deleteMessage", () => {
        msgPg.getMostRecentMsg().trigger('mouseover') //MouseHover on last message
        helperPg.waitForElementToBeVisible(msgPg.getMoreActions())
        msgPg.getMoreActions().click()  //click on more actions
        msgPg.getDeleteMessageOption().click() //click on delete message

        var msgToDelete
        msgPg.getDeleteMsgTxt().then(function(deleteMsg){
            cy.log('Message to be deleted :'+deleteMsg.text())
            msgToDelete = deleteMsg.text()
        })
        msgPg.getDeleteBtn().click() //click on delete message     
        //cy.wait(2000)
        cy.wait('@deleteMsg')
        msgPg.getMostRecentMsg().then(function(msgLocator){
            expect(msgLocator.text()).to.not.contain(msgToDelete)
        })
    })

  /**
   * Searches team menu with given menuoption and click on it.
   * @param {String} menuOption - menu item to be searched in Team menu.
   */
    Cypress.Commands.add("searchTeamMenu", (menuOption) => {
      homePg.getTeamMenuItems().contains(menuOption).click({ force: true })
    })

  /**
   * Searches team's submenu with given sub menu text and click on it.
   * Submenus open a new link in new window, which is handled in this function by opening them in the same original window
   * * @param {String} subMenuOption - sub menu item to be searched in Team's main menu.
   */
    Cypress.Commands.add("searchTeamSubMenu", (subMenuOption) => {
      homePg.getTeamSubMenuItems().each(($el, index, $list) => {
          var opt = $el.find('div').text()
          if(opt.includes(subMenuOption)){
            homePg.getTeamSubMenuItems().eq(index).invoke('attr', 'href').then(href => {
            cy.visit(href)})
          }//if ends
      })
    })

  /**
   * selects the member account type either 'Full Member' or 'Workspace Admin' for given user.
   *  @param {String} member - member whose account type needs to be changed.
   *  @param {String} acctType - account type 'Full member' or 'workspace admin'
   */
    Cypress.Commands.add("selectMemberAcctType", (member,acctType) => {
      adminPage.getMemberEmailLocator().then(function($memberEmail){
      const memberMail = $memberEmail.text()
        if(memberMail.includes(member)){
          //adminPage.getMemberAcctType().then(function(eleAcctType){
          //const acctType = eleAcctType.text()    
            if(acctType.includes('Workspace Admin')){
              adminPage.getAdminMemberTblMenuBtn().click()
              adminPage.getAdminMemberTblMenuOptions().eq(1).contains('Change account type').click()
              adminPage.selAccountAsAdminChkBox().click()
              adminPage.getChangeAcctType_SaveBtn().click()

              //Verify that account type is changed to Workspace admin
              cy.wait(2000)
              adminPage.getMemberAcctType().then(function($eleAcctType){
              expect($eleAcctType.text().trim()).to.contain('Workspace Admin')})    
            }//if(acctType.includes('Full Member')) ends
            else if(acctType.includes('Full Member')){
              adminPage.getAdminMemberTblMenuBtn().click()
              adminPage.getAdminMemberTblMenuOptions().eq(1).contains('Change account type').click()
              adminPage.selAccountAsFullmemberChkBox().click()
              adminPage.getChangeAcctType_SaveBtn().click()
  
              //Verify that account type is changed to Workspace admin
              cy.wait(2000)
              adminPage.getMemberAcctType().then(function($eleAcctType){
              expect($eleAcctType.text().trim()).to.contain('Full Member')})    
            }
              
        }//if(memberMail.includes(this.data.userForTC10)) ends
      })
    })

  /**
   * Deletes the given channel.
   * @param {String} channelName - channel to be deleted
   */
  Cypress.Commands.add("deleteChannel", (channelName) => {
        var channelLocator = "span[data-qa='channel_sidebar_name_"+channelName+"']"
        cy.log(channelLocator)
        cy.get(channelLocator).rightclick()
        channelPage.getAdditionalOptionsChannel().click()

        channelPage.selectDeleteChannelOption().click()
        channelPage.checkDeleteChkbox().click()
        channelPage.getDeleteChannelBtn().click()       
  })






