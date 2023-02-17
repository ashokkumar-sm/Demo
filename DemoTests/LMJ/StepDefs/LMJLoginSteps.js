const { Given, When, Then } = require('@cucumber/cucumber');
const browserUtil = require('../../../CommonUtils/BrowserUtil');
const LMJTab = require('../LMJDefinitions/LMJTab');
const { config } = require('../Configs/LMJ_' + global.testEnv + '.js');
const LMJ = () => browserUtil.switchAndGetTab("LMJ");


When(/^I enter username and password and login$/, () => {
	LMJ().lmjloginpage.loginValidUser();
});


When(/^I enter invalid email username and password and login$/, () => {
	LMJ().lmjloginpage.loginInValidEmail();
});


When(/^I enter username and invalid password and login$/, () => {
	LMJ().lmjloginpage.loginInValidPassword();
});


When(/^I select Trade price and submit$/, () => {
	LMJ().lmjloginpage.submitDisplayPrice();
});


When(/^I select RRP and submit$/, () => {
	LMJ().lmjloginpage.submitRRPPrice();
});


When(/^I select No price and submit$/, () => {
	LMJ().lmjloginpage.submitNoPrice();
});




Then(/^I validate invalid email error message$/, () => {
	expect(LMJ().lmjloginpage.errInvalidEmail).toBeDisplayed({ message: "Invalid email error is not displyed" })
});


Then(/^I validate invalid password error message$/, () => {
	expect(LMJ().lmjloginpage.errInvalidPassword).toBeDisplayed({ message: "Invalid Password error is not displyed" })
});


Then(/^I validate user is logged in successfully$/, () => {
	expect(LMJ().lmjloginpage.popupDisaplayPrice).toBeDisplayed({ message: "Display Price Popup is not displyed" })
});



Then(/^Validate Display Price popup$/, () => {
	expect(LMJ().lmjloginpage.optHidePrice).toBeDisplayed({ message: "Hide Price is not displyed" })
	expect(LMJ().lmjloginpage.optTradePrice).toBeDisplayed({ message: "Trade price option is not displyed" })
	expect(LMJ().lmjloginpage.optRRP).toBeDisplayed({ message: "RRP Option is not displyed" })
});



