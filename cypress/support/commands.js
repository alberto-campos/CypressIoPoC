/**
 * This class refers to reusable functions/commands specific to Slack application
 */
    import adminPg from '../support/pageObjects/adminPg'
    const adminPage = new adminPg()
    /**
    * Wait for element to be visible 
    * @param {String} locator  - element for which this function will wait to be visible in dom
    */
    Cypress.Commands.add("waitForElementToBeVisible",(elementLocator) => {
    var waitForEl = function(selector, callback, count) {
      if (jQuery(selector).length) {
        callback();
      } else {
        setTimeout(function() {
          if(!count) {
            count=0;
          }
          count++;
          console.log("count: " + count);
          if(count<10) {
            waitForEl(selector,callback,count);
          } else {return;}
        }, 100);
      }
    };
  })//waitForElementToBeVisible ends

  /**
     * selects the member account type either 'Full Member' or 'Workspace Admin' for given user.
     *  @param {String} member - member whose account type needs to be changed.
     *  @param {String} acctType - account type 'Full member' or 'workspace admin'
     */
    Cypress.Commands.add("selectMemberAcctType",(member,acctType) =>{
      adminPage.memberEmailLocator.then(function($memberEmail){
          const memberMail = $memberEmail.text()
          if(memberMail.includes(member)){
              if(acctType.includes('Workspace Admin')){
                adminPage.adminMemberTblBtn.click()
                adminPage.adminMemberTblMenuOptions.eq(1).contains('Change account type').click()
                adminPage.accountAsAdminChkBox.click()
                adminPage.changeAcctType_SaveBtn.click()

                  //Verify that account type is changed to Workspace admin
                  cy.wait(2000)
                  adminPage.memberAcctType.then(function($eleAcctType){
                  expect($eleAcctType.text().trim()).to.contain('Workspace Admin')})    
              }//if(acctType.includes('Workspace Admin')) ends
              else if(acctType.includes('Full Member')){
                adminPage.adminMemberTblBtn.click()
                adminPage.adminMemberTblMenuOptions.eq(1).contains('Change account type').click()
                adminPage.accountAsFullmemberChkBox.click()
                adminPage.changeAcctType_SaveBtn.click()

                  //Verify that account type is changed to Workspace admin
                  cy.wait(2000)
                  adminPage.memberAcctType.then(function($eleAcctType){
                  expect($eleAcctType.text().trim()).to.contain('Full Member')})    
              }    
          }//if(memberMail.includes(this.data.userForTC10)) ends
      })
  })

  
  