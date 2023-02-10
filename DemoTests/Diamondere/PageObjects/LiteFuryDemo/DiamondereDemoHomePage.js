const BrowserUtil = require('../../../../CommonUtils/BrowserUtil');
const ElementUtil = require('../../../../CommonUtils/ElementUtil');
const data = require('../../Parameters/SearchData.json');

class DiamondereDemoHomePage {

    get lnkRings() { return $('//div[@id="rings"]') }
    get lnkEngagement() { return $('//div[@id="engagement"]') }
    get lnkWedding() { return $('//div[@id="wedding"]') }
    get lnkNeckless() { return $('//div[@id="necklaces"]') }
    get lnkEarrings() { return $('//div[@id="earrings"]') }
    get lnkBracelets() { return $('//div[@id="bracelets"]') }
    get lnkMens() { return $('//div[contains(@id,"men")]') }
    get lnkWomens() { return $('//div[contains(@id,"Women")]') }
    get txtSearchBox() {return $('//div[@class="responsive-menu corner-gaps"]//input[@placeholder="Search"]')}
    get drpSearch() { return $('//a[@class="dropdown-item"]/span') }
    get lblBreadCrumb() { return $('//ul[@itemprop="breadcrumb"]//span[contains(text(),"RINGS")]') }


    searchProduct(){

        ElementUtil.waitForDisplayed(this.txtSearchBox, 20, "wait for text box to load")
        ElementUtil.sendText(this.txtSearchBox,data.Search.product,"Enter text")
        ElementUtil.waitForDisplayed(this.drpSearch,50,"wait for search dropdown")
        ElementUtil.forceClick(this.drpSearch,"select ring dropdown")  
        ElementUtil.waitForDisplayed(this.lblBreadCrumb,30,"wait for search page load")  

    }
}
module.exports = DiamondereDemoHomePage;
