const Log = require("./Log.js")

/**
 * Send a sequence of key strokes to the active element.
 * 
 * You can also use characters like "Left arrow" or "Back space". WebdriverIO will take care of translating them into unicode characters. You’ll find all supported characters here (https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions). To do that, the value has to correspond to a key from the table.
 * @param {array} keyvalue //eg: ['Shift','W'], "ArrowDown"
 * 
 * 
 */
class BrowserKeysUtil {

    static browserkeys(keyvalue) {
        Log.info("Sending key strokes:" + keyvalue)
        browser.keys(keyvalue)
    }
}
module.exports = BrowserKeysUtil;