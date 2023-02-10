const { config } = require('../Configs/Diamondere_' + global.testEnv + '.js');
const TabDefinition = require('../../../CommonUtils/TabDefinition')
const diamondereDemoHomePage = require('../PageObjects/LiteFuryDemo/DiamondereDemoHomePage');
const diamondereDemoSearchPage = require('../PageObjects/LiteFuryDemo/DiamondereDemoSearchPage');


class DiamondereDemoTab extends TabDefinition {

    name = "Diamonderedemo";
    entryUrl = config.diamondereurl;
    diamonderedemohomepage = new diamondereDemoHomePage();
    diamonderedemosearchpage = new diamondereDemoSearchPage();
}
module.exports = DiamondereDemoTab;