const BrowserUtil = require('../../../../../CommonUtils/BrowserUtil');
const ElementUtil = require('../../../../../CommonUtils/ElementUtil');

class LiteFuryDemoHomePage {

    get lnkHome() { return $('//div[@class="header-wrap"]//a[text()="Home"]') }
    get lnkAboutUs() { return $('//div[@class="header-wrap"]//a[text()="Aboute Us"]') }
    get lnkContact() { return $('//div[@class="header-wrap"]//a[text()="Contact"]') }

    selectContactLink(){

        ElementUtil.waitForDisplayed(this.lnkContact, 15, "wait for page to load")
        BrowserUtil.wait(3)
        ElementUtil.click(this.lnkContact,"select contact us link")

    }
}
module.exports = LiteFuryDemoHomePage;
