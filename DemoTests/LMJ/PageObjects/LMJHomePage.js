const BrowserUtil = require('../../../CommonUtils/BrowserUtil');
const ElementUtil = require('../../../CommonUtils/ElementUtil');
const data = require('../Parameters/SearchData');
const { config } = require('../Configs/LMJ_' + global.testEnv + '.js');

class LMJHomePage {

    get lnkRings() { return $('//span[text()="Rings"]') }
    get lnkEarrings() { return $('//span[text()="Earrings"]') }
    get lnkBracelets() { return $('//span[text()="Bracelets"]') }
    get lnkBangles() { return $('//span[text()="Bangles"]') }
    get lnkNecklaces() { return $('//span[text()="Necklaces"]') }
    get lnkNewLines() { return $('//span[text()="New Lines"]') }
    get lnkUserLogin() { return $('//div[@class="is-flex is-justify-content-space-between is-hidden-mobile px-2 py-2"]//span[contains(text(),"person")]') }
    get lnkUserLogout(){ return $("//div[@id='__layout']/div[1]/div[1]/div[2]/ul[2]/li[2]/div[1]/div[2]/div[1]/div[1]") }
    get btnNewDesign() { return $('//button[contains(text(),"NEW DESIGNS")]') }

    selectLoginLink(){

        ElementUtil.waitForDisplayed(this.lnkUserLogin, 20, "wait for user login link")
        ElementUtil.forceClick(this.lnkUserLogin,"select login link")  

    }

    searchProduct(){

        ElementUtil.waitForDisplayed(this.txtSearchBox, 20, "wait for text box to load")
        ElementUtil.sendText(this.txtSearchBox,data.Search.product,"Enter text")
        ElementUtil.waitForDisplayed(this.drpSearch,50,"wait for search dropdown")
        ElementUtil.forceClick(this.drpSearch,"select ring dropdown")  
        ElementUtil.waitForDisplayed(this.lblBreadCrumb,30,"wait for search page load")  

    }
    
    
    lnkUserSelectsLogout(){
        browser.url(config.lmjurl)
        BrowserUtil.wait(2)
        ElementUtil.waitForDisplayed(this.lnkUserLogin, 20, "wait for user login link")
        ElementUtil.mouseHover(this.lnkUserLogin,"mouse hover on profile") 
        BrowserUtil.wait(2)
        ElementUtil.forceClick(this.lnkUserLogout,"Logout") 
        BrowserUtil.wait(2)
        console.log("User logs out")
    }


    selectNewDesign(){
        ElementUtil.waitForDisplayed(this.btnNewDesign, 20, "wait for NEW DESIGN BUTTON")
        ElementUtil.forceClick(this.btnNewDesign,"select new design button")  
    }
}
module.exports = LMJHomePage;
