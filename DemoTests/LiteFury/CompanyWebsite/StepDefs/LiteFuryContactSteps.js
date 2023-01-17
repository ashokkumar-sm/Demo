const { Given, When, Then } = require('@cucumber/cucumber');
const browserUtil = require('../../../../CommonUtils/BrowserUtil');
const { config } = require('../Configs/litefury_' + global.testEnv + '.js');
const litefurydemo = () => browserUtil.switchAndGetTab("LiteFurydemo");



When(/^User fills contact form and select submit$/, () => {
	litefurydemo().litefurydemocontactpage.enterContactDetails();
});



Then(/^Verify success message is displayed$/, () => {
	expect(litefurydemo().litefurydemocontactpage.lblSuccessMessage).toHaveText("Submitted Successfully", { wait: 1000, ignoreCase: true, message: "message did not match expected value" })
});

