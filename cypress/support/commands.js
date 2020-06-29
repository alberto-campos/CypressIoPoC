/**
 * This class refers to reusable functions/commands specific to Slack application
 */
    import adminPg from '../support/pageObjects/adminPg'
    import slackHomePg from '../support/pageObjects/slackHomePg'
    import 'cypress-file-upload';

    const homePg = new slackHomePg()
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
                adminPage.chngeAccountTypeOption.click()
                adminPage.accountAsAdminChkBox.click()
                adminPage.changeAcctType_SaveBtn.click()

                //Verify that account type is changed to Workspace admin
                adminPage.changeAcctType_SaveBtn.should('not.exist')
                adminPage.memberEmailLocator.should('contain',member)
                                        .should('have.length',1)
                adminPage.memberAcctType.should('contain','Workspace Admin')
              }//if(acctType.includes('Workspace Admin')) ends
              else if(acctType.includes('Full Member')){
                adminPage.adminMemberTblBtn.click()
                adminPage.chngeAccountTypeOption.click()
                adminPage.accountAsFullmemberChkBox.click()
                adminPage.changeAcctType_SaveBtn.click()
                adminPage.changeAcctType_SaveBtn.should('not.exist')
                adminPage.memberEmailLocator.should('contain',member)
                                        .should('have.length',1)
                //Verify that account type is changed to Workspace admin
                adminPage.memberAcctType.should('contain','Full Member') 
              }    
          }//if(memberMail.includes(this.data.userForTC10)) ends
      })
    })

    Cypress.Commands.add('uploadFile', (fileName, fileType = ' ', selector) => {
        cy.get(selector).then(subject => {
          cy.fixture(fileName, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
              const el = subject[0]
              const testFile = new File([blob], fileName, { type: fileType })
              const dataTransfer = new DataTransfer()
              dataTransfer.items.add(testFile)
              el.files = dataTransfer.files
              console.log(el.files)
            })
        })
    })

    Cypress.Commands.add('navigateAdminMembersPg',()=> {
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('Settings & administration')
        homePg.searchTeamSubMenu('Manage members')
    })

  
  