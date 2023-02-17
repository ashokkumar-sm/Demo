const ElementUtil = require("../../../CommonUtils/ElementUtil");
const BrowserUtil = require('../../../CommonUtils/BrowserUtil');
const BrowserKeysUtil = require("../../../CommonUtils/BrowserKeysUtil");

class lmjProductDetailPage{

get lnkmetalType9KT() { return $('//div[@class="is-flex-tablet"]//p[text()="9 KT"]/following::div[1]//button[contains(text(),"WG")]')}
get lnkGemStone() { return $('//span[text()="Choose Gemstone Quality"]/following::div[1]//button')}
get lnkTotalWeight(){ return $('//span[text()="Choose Total Weight"]/following::div[1]//button')}
get drpRingSize() { return $('//span[text()="Ring Size"]/following::div[1]//select')}
get drpRingSizeL() { return $('//span[text()="Ring Size"]/following::div[1]//select/optgroup[1]/option[1]')}
get lblestimatedDeliveryTime() { return $('//p[contains(text(),"4 business days")]')}
get btnAddToCart(){ return $('//button[contains(text(),"Add To Cart")]')}
get btnCheckOut(){ return $('//a[contains(text(),"Check out now")]')}






selectAddToCart(){

    ElementUtil.click(this.btnAddToCart,"select add to cart")
}

selectCheckoutNow(){
    ElementUtil.waitForDisplayed(this.btnCheckOut,20,"wait for link to load")
    ElementUtil.click(this.btnCheckOut,"select checkout now")
}




    selectMetalType(){
        ElementUtil.waitForDisplayed(this.lnkmetalType9KT,20,"wait for link to load")
        ElementUtil.forceClick(this.lnkmetalType9KT,"click metal type")
        BrowserUtil.wait(3)
    }

    selectGemStoneQuality(){
        BrowserUtil.wait(2)
        ElementUtil.waitForDisplayed(this.lnkGemStone,20,"wait for link to load")
        ElementUtil.forceClick(this.lnkGemStone,"click gemstone")
        BrowserUtil.wait(5)
    }


    selectTotalWeight(){
        BrowserUtil.wait(2)
        ElementUtil.waitForDisplayed(this.lnkTotalWeight,20,"wait for link to load")
        ElementUtil.forceClick(this.lnkTotalWeight,"click total weight")
        BrowserUtil.wait(5)

    }

    selectRingSize(){

        BrowserUtil.wait(2)
        ElementUtil.scrollIntoView(this.drpRingSize,"move to dropdown")
        //ElementUtil.click(this.drpRingSize,"choose dropdown")
        BrowserUtil.wait(5)
        ElementUtil.scrollIntoView(this.drpRingSizeL,"move to dropdown")
        ElementUtil.click(this.drpRingSizeL,"move to dropdown")
    }

}
module.exports = lmjProductDetailPage;