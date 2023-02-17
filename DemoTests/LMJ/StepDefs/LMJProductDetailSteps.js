const { Given, When, Then } = require('@cucumber/cucumber');
const browserUtil = require('../../../CommonUtils/BrowserUtil');
const { config } = require('../Configs/LMJ_' + global.testEnv + '.js');
const LMJ = () => browserUtil.switchAndGetTab("LMJ");


When(/^I choose metal type value$/, () => {
	LMJ().lmjproductdetailspage.selectMetalType();
});



When(/^I choose Gemstone quality$/, () => {
	LMJ().lmjproductdetailspage.selectGemStoneQuality();
});


When(/^I choose total weight$/, () => {
	LMJ().lmjproductdetailspage.selectTotalWeight();
});



When(/^Select ring size$/, () => {
	LMJ().lmjproductdetailspage.selectRingSize();
});


When(/^Select quanitity$/, () => {
	return true;
});


When(/^I select add to cart button$/, () => {
	LMJ().lmjproductdetailspage.selectAddToCart();
});


When(/^I select checkout button$/, () => {
	LMJ().lmjproductdetailspage.selectCheckoutNow();
});




Then(/^Validate estimated delivery time$/, () => {
	expect(LMJ().lmjproductdetailspage.lblestimatedDeliveryTime).toBeDisplayed({ message: "Estimated delivery date is not displayed" })
});





