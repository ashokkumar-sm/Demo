const { Before, After } = require('@cucumber/cucumber');
const Log = require('../CommonUtils/Log');
const scenarioContext = require('../CommonUtils/ScenarioContext');
const SetupAndTearDown = require('../CommonUtils/SetupAndTeardown');

let skipAllDueToSetupFailure = false;
let scenarioContexts = [];

// This hook is ran before every scenario. 
Before(function ({ pickle }) {

    // If any setup scenario fails, all scenarios will be skipped
    if (skipAllDueToSetupFailure) {
        return 'skipped';
    }

    // We add any scenario context values that were set in setup steps
    // to this scenarios context
    for (let i = 0; i < scenarioContexts.length; i++) {
        let sc = scenarioContexts[i];
        Object.keys(sc).forEach(function (key, index) {
            scenarioContext.setValue(key, sc[key]);
        });
    }
});

// This hook is only ran after @SETUP scenarios. 
After({ tags: SetupAndTearDown.setupTag }, function ({ pickle, result }) {
    // If the scenario fails (after retries), remaining scenarios will be skipped.
    if (result.status === 'failed' && !result.retried) {
        Log.error(`Setup scenario '${pickle.name}' failed. Skipping the remaining scenarios of this feature.`)
        skipAllDueToSetupFailure = true;
    }
    else { // Otherwise we store scenario context values for this setup so that they can be used later.
        let sc = scenarioContext.getAllValues();
        if (Object.keys(sc).length > 0)
            scenarioContexts.push(sc);
    }
});
