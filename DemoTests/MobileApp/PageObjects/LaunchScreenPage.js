const ElementUtil = require("../../../CommonUtils/ElementUtil");
const path = require('path')
var wd = require("selenium-webdriver");
By = wd.By,
until = wd.until;

// Setting Desired Capabilities.
var desiredCaps = {
    "platformName": "Android",
    "appium:platformVersion": "13",
    "appium:deviceName": "Redmi Note 11",
    "appium:app": path.join(process.cwd(),"DemoTests/MobileApp/AndroidApp/app-release.apk"),
    "appium:automationName": "UIAutomator2",
       
};

class LaunchScreenPage{

    get chkResult() { return $('~text_department') }

    
     async searchProduct(){

        const lnkClick = await $('~search');
        await lnkClick.click()
        const txtSearch = await $('~search_default_search_text_input');
        await txtSearch.setValue("shoes"+"\\n")
        console.log("clicked")

    }


}
module.exports = LaunchScreenPage;