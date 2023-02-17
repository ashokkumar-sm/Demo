const { Given, When, Then } = require('@cucumber/cucumber');
const browserUtil = require('../../../CommonUtils/BrowserUtil');
const LMJTab = require('../LMJDefinitions/LMJTab');
const BrowserUtil = require('../../../CommonUtils/BrowserUtil');
const { config } = require('../Configs/LMJ_' + global.testEnv + '.js');
const LMJ = () => browserUtil.switchAndGetTab("LMJ");

/////////////////////////////////////////////////////////////////////////////
// GIVENS
/////////////////////////////////////////////////////////////////////////////



When(/^the user has opened LMJ portal$/, () => {
	browserUtil.openTab(new LMJTab());
	BrowserUtil.maximize()
});




When(/^I select Login menu link$/, () => {
	LMJ().lmjhomepage.selectLoginLink();
});

When(/^user selects logout$/, () => {
	LMJ().lmjhomepage.lnkUserSelectsLogout();
});



When(/^I select see all new design button$/, () => {
	LMJ().lmjhomepage.selectNewDesign();
});


Given(/^I search for Ring$/, () => {
	LMJ().lmjhomepage.searchProduct();
});


Then(/^Verify all home page menu links in LMJ$/, () => {
	expect(LMJ().lmjhomepage.lnkRings).toBeDisplayed({ message: "Ring menu is not displyed" })
	expect(LMJ().lmjhomepage.lnkEarrings).toBeDisplayed({ message: "Earrings menu is not displyed" })
	expect(LMJ().lmjhomepage.lnkBracelets).toBeDisplayed({ message: "Bracelets menu is not displyed" })
	expect(LMJ().lmjhomepage.lnkBangles).toBeDisplayed({ message: "Bangles menu is not displyed" })
	expect(LMJ().lmjhomepage.lnkNecklaces).toBeDisplayed({ message: "Necklaces menu is not displyed" })
	expect(LMJ().lmjhomepage.lnkNewLines).toBeDisplayed({ message: "NewLines menu is not displyed" })
});



Then(/^Verify womens menu link in Diamondere$/, () => {
	expect(LMJ().lmjhomepage.lnkWomens).toBeDisplayed({ message: "Womens menu is not displyed" })
});


