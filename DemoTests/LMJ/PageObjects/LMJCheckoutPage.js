const BrowserUtil = require("../../../CommonUtils/BrowserUtil");
const ElementUtil = require("../../../CommonUtils/ElementUtil");


class LMJCheckoutPage{


    get btnNext() { return $('//button[contains(text(),"Next")]')} 
    get btnAddressNext() { return $('//p[contains(text(),"Next")]')} 
    get lblOrderDetails()  { return $('//div[@class="column is-5-desktop has-background-white p-l-25 p-l-20-mob p-b-0-mob is-flex is-flex-direction-column"]')} 
    get lblAddress() { return $('//p[@class="py-2 px-4 address-line"]')} 
    get lblOrderSummary() { return $('//div[@class="is-flex-tablet is-justify-content-space-between"]')} 
    get btnPlaceOrder() { return $('//p[contains(text(),"Place Order")]')} 
    get lblSuccessMessage() { return $('//div[@class="card"]//h5[contains(text(),"Congratulations")]')} 

 
    

    selectNextButton(){
        ElementUtil.waitForDisplayed(this.btnNext,20,"wait for page laod")
        ElementUtil.click(this.btnNext,"select next")
        BrowserUtil.wait(3)
    }

    selectAddressNextButton(){
        ElementUtil.waitForDisplayed(this.btnAddressNext,20,"wait for page laod")
        ElementUtil.click(this.btnAddressNext,"select next")
        BrowserUtil.wait(3)

    }

    selectPlaceOrder(){

        ElementUtil.waitForDisplayed(this.btnPlaceOrder,20,"wait for page laod")
        ElementUtil.click(this.btnPlaceOrder,"select place order")
        BrowserUtil.wait(3)

    }
}
module.exports = LMJCheckoutPage;