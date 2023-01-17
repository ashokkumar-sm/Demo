const { config } = require('../Configs/litefury_' + global.testEnv + '.js');
const TabDefinition = require('../../../../CommonUtils/TabDefinition')
const liteFuryDemoHomePage = require('../PageObjects/LiteFuryDemo/LiteFuryDemoHomePage');
const litefuryDemoContactPage = require('../PageObjects/LiteFuryDemo/LiteFuryDemoContactPage');


class LiteFuryDemoTab extends TabDefinition {

    name = "LiteFurydemo";
    entryUrl = config.litefuryurl;
    litefurydemohomepage = new liteFuryDemoHomePage();
    litefurydemocontactpage = new litefuryDemoContactPage();
}
module.exports = LiteFuryDemoTab;