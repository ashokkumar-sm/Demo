const BrowserUtil = require('../../../CommonUtils/BrowserUtil');
const ElementUtil = require('../../../CommonUtils/ElementUtil');


class LMJSearchPage {

    get lblBreadCrumb() { return $('//ul[@itemprop="breadcrumb"]//span[contains(text(),"RINGS")]') }
    get adPopup() { return $('//div[@class="mc-layout__modalContent"]') }
    get lnkClose() { return $('//div[@class="mc-closeModal"]')}
    get lnkRings() { return $('//span[text()="Rings"]') }
    get lnkSolitaires() { return $('//a[contains(text(),"Solitaires")]')}
    get lblTradePrice() { return $$('//div[@class="wd-100 p-20-mob"]//p[@class="has-text-weight-bold ln-height-17 mb-0"]/span/span[contains(text(),"£")]')}
    get lnkSelectProduct()  { return $('//div[@class="wd-100 p-20-mob"]//div[@class="has-text-centered is-flex is-flex-direction-column"]/div/img[@alt="SL9657(WG)"]') }

   
    selectProduct(){
        ElementUtil.waitForDisplayed(this.lnkSelectProduct, 75, "wait for product to load")
        ElementUtil.forceClick(this.lnkSelectProduct,"select product")

    }

    closePopup(){

        ElementUtil.waitForDisplayed(this.adPopup, 75, "wait for popup")
        ElementUtil.waitForDisplayed(this.lnkClose,25,"wait for close link")
        ElementUtil.forceClick(this.lnkClose,"close popup")
        BrowserUtil.wait(3)
    }

    selectSolitaires(){

        ElementUtil.waitForDisplayed(this.lnkRings, 75, "wait for Rings to load")
        ElementUtil.mouseHover(this.lnkRings,"Move hover on Rings")
        BrowserUtil.wait(3)
        ElementUtil.forceClick(this.lnkSolitaires,"select Solitaires")
        BrowserUtil.wait(3)
    }

}
module.exports = LMJSearchPage;
