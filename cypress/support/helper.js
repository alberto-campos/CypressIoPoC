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

}//class helper ends
export default helper;