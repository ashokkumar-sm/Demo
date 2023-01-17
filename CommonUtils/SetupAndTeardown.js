const Log = require('./Log');

const setupTag = "@SETUP";
const teardownTag = "@TEARDOWN";

// NOTE: 08/03/2022 Setup and teardown util that was not compatiable with webdriver v7. 
// calling method removed. To revisit we need to make this custom code bit Work

module.exports.removeBeforeSteps = function (feature, scenarios) {
    // We count the number of Background steps present in this feature file
    let nrOfBgSteps = 0;
    if (feature.document.feature.children[0].type == "Background") {
        nrOfBgSteps = feature.document.feature.children[0].steps.length;
    }

    // If there are any background steps we remove them from @SETUP and @TEARDOWN scenarios
    if (nrOfBgSteps > 0)
        for (let s = 0; s < scenarios.length; s++) {
            let pickle = scenarios[s].pickle;
            for (let t = 0; t < pickle.tags.length; t++) {
                let tag = pickle.tags[t];
                if (tag.name == setupTag || tag.name == teardownTag) {
                    pickle.steps.splice(0, nrOfBgSteps);
                    break;
                }
            }
        }
};

module.exports.setupTag = setupTag;
module.exports.teardownTag = teardownTag;
