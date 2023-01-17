const Log = require('./Log.js');

class StringNumericUtil {

    /**
     * Generate a random integer within a give number range
     * @param {Int16Array} min value
     * @param {Int16Array} max Value
     */
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

        /**
     * Generate a random string
     */

    static generateString(length) {
    const characters ='abcdefghijklmnopqrstuvwxyz';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
    
}

}

module.exports = StringNumericUtil;