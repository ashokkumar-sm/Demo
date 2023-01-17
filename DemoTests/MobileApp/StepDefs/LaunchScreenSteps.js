const { Given, When, Then } = require('@cucumber/cucumber');
const LaunchScreenPage = require('../PageObjects/LaunchScreenPage');


Given(/^Launch mobile app$/, async() => {
	console.log("App is launched")
});



When(/^I select search and search for a product$/, async () => {
	const demoAndroidLaunchPage = new LaunchScreenPage
    await demoAndroidLaunchPage.searchProduct()
});



Then(/^Ensure search result is displayed$/, async() => {
	const demoAndroidLaunchPage = new LaunchScreenPage
    await expect(demoAndroidLaunchPage.chkResult).toBeDisplayed({ message: 'Result Page is not displayed' })
});


