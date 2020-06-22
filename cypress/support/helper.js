/**
 * This class refers to general reusable functions not specific to any application.
 */
class helper {
    /**
      * Generates a five character alphanumberic random string
      * @returns {String} result
      */
    randomTextGenerator() {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength)).toLocaleLowerCase();
        }
        return result;
    }  

    /**
      * Generates a five character alphanumberic random string
      * @param {String} locator  - element for which this function will wait to be visible in dom
      */
    waitForElementToBeVisible(elementLocator) {
      var waitForEl = function(selector, callback, count) {
        if (jQuery(selector).length) {
          callback();
        } else {
          setTimeout(function() {
            if(!count) {
              count=0;
            }
            count++;
            cy.log("count: " + count);
            if(count<10) {
              waitForEl(selector,callback,count);
            } else {return;}
          }, 100);
        }
      };
    }//waitForElementToBeVisible ends
}//class helper ends
export default helper;