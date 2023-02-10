const { Given, When, Then } = require('@cucumber/cucumber');
const browserUtil = require('../../../CommonUtils/BrowserUtil');
const { config } = require('../Configs/Diamondere_' + global.testEnv + '.js');
const Diamonderedemo = () => browserUtil.switchAndGetTab("Diamonderedemo");


When(/^I wait for ad popup and close ad popup$/, () => {
	Diamonderedemo().diamonderedemosearchpage.closePopup();
});




Then(/^Ensure Ring search result page is browsed$/, () => {
	expect(Diamonderedemo().diamonderedemosearchpage.lblBreadCrumb).toBeDisplayed({ message: "Ring breadcrumb is not displyed" })
});





