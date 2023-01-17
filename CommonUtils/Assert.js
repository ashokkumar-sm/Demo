const Log = require("./Log");       

class Assert {

    /**
    To do assertion if actual and expected values are equal
    @param {*} actual value
    @param {*} expected value
    @param {*} description of what these values are of 
    */
    static assertEquals(actual, expected,description) {
        if(actual===expected)
        Log.info("Actual and Expected match as '"+actual+"' for '"+description+"'")
        else{
            let message = "Actual is '" + actual +"'. But expected is '"+expected +"' for '"+description+"'"|| "Assertion failed";
            if (typeof Error !== "undefined") {
                throw new Error(message);
            }
            throw message; 
        }
    }

    /**
    To do assertion if expected value is contained in actual value
    @param {*} actual value
    @param {*} expected value
    @param {*} description of what these values are of 
    */
    static assertContains(actual, expected, description) {
        Log.info("Comparing actual value contains expected value for '"+description+"'")
        if(actual.includes(expected))
        Log.info("'" + expected+"' was found within '"+ actual+"' for '"+description+"'")
        else{
            let message = "'" + expected+"' was not found within '"+ actual+"' for '"+description+"'"|| "Assertion failed";
            if (typeof Error !== "undefined") {
                throw new Error(message);
            }
            throw message; 
        }
    }

    /**
     * Assertion that a given condition is true
     * @param {*} value - Boolean value of condition
     * @param {*} description of what the value is of
     */
    static assertTrue(value,description)
    {
        Log.info("Asserting that the value of " + description + " is TRUE")
        if(value === true)
        Log.info("Value of " + description + " is TRUE")
        else{
            let message = "Value of " + description + " is FALSE. But expected is TRUE" || "Assertion failed";
            if (typeof Error !== "undefined") {
                throw new Error(message);
            }
            throw message; 
        }
    }
}

module.exports = Assert;