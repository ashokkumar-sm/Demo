const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const Log = require('../CommonUtils/Log');
const featureContext = require('../CommonUtils/FeatureContext');
const TabDefinition = require('../CommonUtils/TabDefinition');
const BrowserUtil = require('../CommonUtils/BrowserUtil');

var someValue = "hello";



///////////////////////////////////////////////////////////////////////////
// SINGLE USE STEP HACK EXAMPLES

Given(
    /^one-time step (.*)$/,
    { wrapperOptions: { retry: 1 } },
    (value) => {
        Log.debug("Performing one-time step with value: " + value);
        // expect("sdsd").toHaveTextContaining("hello", { message: "No" });
        if (value == "Y")
            throw "Dumbass";
    })

Then(
    /^we remove (.*)$/,
    { wrapperOptions: { retry: 1 } },
    (value) => {
        Log.debug("Removing " + value);
    });


// TODO: Needs to be moved to a common location
Given(
    /^SKIPPED: (.*)$/,
    (text) => {
        // SINGLE-STEP HACK
    });

///////////////////////////////////////////////////////////////////////////


Given(
    /^some random log messages$/,
    { wrapperOptions: { retry: 1 } },
    () => {
        Log.debug("Here is a debug message");
        Log.info("Here is some info");
        Log.warning("Here is a warning");
        Log.error("Here is an error");
    });


Given(
    /^the user logs some passed data store values$/,
    { wrapperOptions: { retry: 1 } },
    () => {
        Log.debug(featureContext.getValue("liveCard"));
        Log.debug(featureContext.getValue("testData"));
    });

Given(
    /^the user opens a new TAB named (.*) to the url (.*)$/,
    { wrapperOptions: { retry: 1 } },
    (name, url) => {
        let newTab = new TabDefinition();
        newTab.name = name;
        newTab.entryUrl = url;
        BrowserUtil.openTab(newTab);
    });

Given(
    /^a random integer between (.*) and (.*) inclusive, named (.*) stored in CONTEXT$/,
    (min, max, name) => {
        var randomInt = Math.floor(Math.random() * (max - min + 1) + min)
        context.setValue(name, randomInt);
    });

Given(
    /^the value has been set to (.*)$/,
    { wrapperOptions: { retry: 1 } },
    (value, name) => {
        //Log.custom("Hello", "pink" );
        Log.debug("A Debug Message");
        context.setValue(name, value);
    });



Given(
    /^the value named (.*) has been removed from the DATASTORE$/,
    { wrapperOptions: { retry: 1 } },
    (name) => {
        featureContext.remo
    })



Given(
    /^we can log the value$/,
    { wrapperOptions: { retry: 1 } },
    () => {
        Log.debug("VALUE: " + someValue);
    });


Given(
    /^normal background step (.*)$/,
    { wrapperOptions: { retry: 1 } },
    (value) => {
        Log.debug("Performing normal background step " + value);
    });


Then(
    /^we can log (.*)$/,
    { wrapperOptions: { retry: 1 } },
    (value) => {
        Log.debug("Logging " + value);
    });