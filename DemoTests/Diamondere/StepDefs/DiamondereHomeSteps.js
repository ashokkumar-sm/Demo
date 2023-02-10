const { Given, When, Then } = require('@cucumber/cucumber');
const browserUtil = require('../../../CommonUtils/BrowserUtil');
const DiamonderePageTab = require('../DiamondereDefinitions/DiamondereDemoTab');
const { config } = require('../Configs/Diamondere_' + global.testEnv + '.js');
const Diamonderedemo = () => browserUtil.switchAndGetTab("Diamonderedemo");

/////////////////////////////////////////////////////////////////////////////
// GIVENS
/////////////////////////////////////////////////////////////////////////////



Given(/^the user has opened Diamondere portal$/, () => {
	browserUtil.openTab(new DiamonderePageTab());
});




Given(/^I search for Ring$/, () => {
	Diamonderedemo().diamonderedemohomepage.searchProduct();
});



Then(/^Verify all home page menu links in Diamondere$/, () => {
	expect(Diamonderedemo().diamonderedemohomepage.lnkRings).toBeDisplayed({ message: "Ring menu is not displyed" })
	expect(Diamonderedemo().diamonderedemohomepage.lnkEngagement).toBeDisplayed({ message: "Engagement menu is not displyed" })
	expect(Diamonderedemo().diamonderedemohomepage.lnkWedding).toBeDisplayed({ message: "Wedding menu is not displyed" })
	expect(Diamonderedemo().diamonderedemohomepage.lnkNeckless).toBeDisplayed({ message: "Neckless menu is not displyed" })
	expect(Diamonderedemo().diamonderedemohomepage.lnkEarrings).toBeDisplayed({ message: "Earing menu is not displyed" })
	expect(Diamonderedemo().diamonderedemohomepage.lnkBracelets).toBeDisplayed({ message: "Bracelet menu is not displyed" })
	expect(Diamonderedemo().diamonderedemohomepage.lnkMens).toBeDisplayed({ message: "Mens menu is not displyed" })
});



Then(/^Verify womens menu link in Diamondere$/, () => {
	expect(Diamonderedemo().diamonderedemohomepage.lnkWomens).toBeDisplayed({ message: "Womens menu is not displyed" })
});


