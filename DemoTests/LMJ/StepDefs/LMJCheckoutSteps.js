const { Given, When, Then } = require('@cucumber/cucumber');
const browserUtil = require('../../../CommonUtils/BrowserUtil');
const { config } = require('../Configs/LMJ_' + global.testEnv + '.js');
const LMJ = () => browserUtil.switchAndGetTab("LMJ");




Then(/^Validate order details$/, () => {
    expect(LMJ().lmjcheckoutpage.lblOrderDetails).toBeDisplayed({ message: "Order details is not displayed" })
});


Then(/^Validate address is loaded by default$/, () => {
    expect(LMJ().lmjcheckoutpage.lblAddress).toBeDisplayed({ message: "Address is not displayed" })
});


Then(/^Validate Order summary$/, () => {
    expect(LMJ().lmjcheckoutpage.lblOrderSummary).toBeDisplayed({ message: "Order Summary is not displayed" })
});


When(/^Select Place order button$/, () => {
	LMJ().lmjcheckoutpage.selectPlaceOrder();
});



When(/^I select Next button$/, () => {
	LMJ().lmjcheckoutpage.selectNextButton();
});


When(/^I select Next button in address$/, () => {
	LMJ().lmjcheckoutpage.selectAddressNextButton();
});



Then(/^Validate success order popup$/, () => {
    expect(LMJ().lmjcheckoutpage.lblSuccessMessage).toBeDisplayed({ message: "Sucess message is not displayed" })
});


