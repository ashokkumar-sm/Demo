const { Given, When, Then } = require('@cucumber/cucumber');
const browserUtil = require('../../../CommonUtils/BrowserUtil');
const { config } = require('../Configs/LMJ_' + global.testEnv + '.js');
const LMJ = () => browserUtil.switchAndGetTab("LMJ");


When(/^I wait for ad popup and close ad popup$/, () => {
	LMJ().lmjsearchpage.closePopup();
});


When(/^I select Solitaires from Ring menu$/, () => {
	LMJ().lmjsearchpage.selectSolitaires();
});



When(/^I select product from search result page$/, () => {
	LMJ().lmjsearchpage.selectProduct();
});



Then(/^I validate Trade price is displayed in UI$/, () => {
	expect(LMJ().lmjsearchpage.lblTradePrice).toBeDisplayed({ message: "Price is not displyed" })
});


Then(/^I validate RRP price is displayed in UI$/, () => {
	expect(LMJ().lmjsearchpage.lblTradePrice).toBeDisplayed({ message: "RRP Price is not displyed" })
});


Then(/^I validate price is not displayed in UI$/, () => {
	expect(LMJ().lmjsearchpage.lblTradePrice).not.toBeDisplayed({ message: "Price is displyed even though Hide is selected" })
});





Then(/^Ensure Ring search result page is browsed$/, () => {
	expect(LMJ().lmjsearchpage.lblBreadCrumb).toBeDisplayed({ message: "Ring breadcrumb is not displyed" })
});





