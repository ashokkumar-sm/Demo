const Log = require('./Log.js');
const browserUtil = require('./BrowserUtil.js')

class TabDefinition {

    name = "";
    entryUrl = "";
    windowHandle = "";

    constructor() { }

    refresh() {
        browserUtil.refreshTab(this.name);
    }

    getTitle() {
        return browserUtil.getTabTitle(this.name);
    }

    getUrl() {
        return browserUtil.getTabUrl(this.name);
    }
}

module.exports = TabDefinition;
