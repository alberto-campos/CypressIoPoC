/**
 * This is the base page that all other pages extend from. This allows you to write functions like
open(path) which are necessary for each page object. Therefore, if you are writing a function
that all page objects will need to use, write it in this class
 */

export default class baseTest {
    
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
}