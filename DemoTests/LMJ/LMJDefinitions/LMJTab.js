const { config } = require('../Configs/LMJ_' + global.testEnv + '.js');
const TabDefinition = require('../../../CommonUtils/TabDefinition')
const lmjHomePage = require('../PageObjects/LMJHomePage');
const lmjLoginPage = require('../PageObjects/LMJLoginPage');
const lmjSearchPage = require('../PageObjects/LMJSearchPage');
const lmjProductDetailPage = require('../PageObjects/LMJProductDetailPage');
const lmjCheckoutPage = require('../PageObjects/LMJCheckoutPage');


class DiamondereDemoTab extends TabDefinition {

    name = "LMJ";
    entryUrl = config.lmjurl;
    lmjhomepage = new lmjHomePage();
    lmjsearchpage = new lmjSearchPage();
    lmjloginpage = new lmjLoginPage();
    lmjproductdetailspage = new lmjProductDetailPage();
    lmjcheckoutpage = new lmjCheckoutPage();
}
module.exports = DiamondereDemoTab;