const BrowserUtil = require('../../../../CommonUtils/BrowserUtil');
const ElementUtil = require('../../../../CommonUtils/ElementUtil');


class DiamondereDemoSearchPage {

    get lblBreadCrumb() { return $('//ul[@itemprop="breadcrumb"]//span[contains(text(),"RINGS")]') }
    get adPopup() { return $('//div[@class="mc-layout__modalContent"]') }
    get lnkClose() { return $('//div[@class="mc-closeModal"]')}


    closePopup(){

        ElementUtil.waitForDisplayed(this.adPopup, 75, "wait for popup")
        ElementUtil.waitForDisplayed(this.lnkClose,25,"wait for close link")
        ElementUtil.forceClick(this.lnkClose,"close popup")
        BrowserUtil.wait(3)
    }

}
module.exports = DiamondereDemoSearchPage;
