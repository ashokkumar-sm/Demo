const { Given, When, Then } = require('@cucumber/cucumber');
const browserUtil = require('../../../../CommonUtils/BrowserUtil');
const LiteFuryPageTab = require('../LiteFuryDefinitions/LiteFuryDemoTab');
const BrowserUtil = require('../../../../CommonUtils/BrowserUtil');
const { config } = require('../Configs/litefury_' + global.testEnv + '.js');
const LiteFurydemo = () => browserUtil.switchAndGetTab("LiteFurydemo");

/////////////////////////////////////////////////////////////////////////////
// GIVENS
/////////////////////////////////////////////////////////////////////////////



Given(/^the user has opened LiteFury portal$/, () => {
	browserUtil.openTab(new LiteFuryPageTab());
});



Given(/^Select contact link$/, () => {
	LiteFurydemo().litefurydemohomepage.selectContactLink();
});


Then(/^Verify all home page menu links$/, () => {
	expect(LiteFurydemo().litefurydemohomepage.lnkHome).toHaveText("Home", { wait: 1000, ignoreCase: true, message: "Home menu is not displayed" })
	expect(LiteFurydemo().litefurydemohomepage.lnkAboutUs).toHaveText("Aboute Us", { wait: 1000, ignoreCase: true, message: "AboutUs menu is not displayed" })
	expect(LiteFurydemo().litefurydemohomepage.lnkContact).toHaveText("Contact", { wait: 1000, ignoreCase: true, message: "Contact Us menu is not displayed" })
});

