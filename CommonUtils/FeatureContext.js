const Log = require('./Log.js');

class FeatureContext {

    static #VALUES = {};

    /**
     * Sets a feature context value with a given name
     * @param {string} name Name of the value
     * @param {string} value Value
     */
    static setValue(name, value) {
        if (this.#VALUES[name] != null)
            Log.warning(`A variable named "${name}" with value "${this.#VALUES[name]}" already exists in the feature context. Overwriting it with new value: "${value}"`);
        else
            Log.info(`Adding variable named "${name}" with value "${value}" to feature context`);

        this.#VALUES[name] = value;
    }

    /**
     * Retrieves a feature context value by name
     * @param {string} name Name of the value
     */
    static getValue(name) {
        if (this.#VALUES[name] == null)
            throw new Error(`Feature context does not contain a variable named ${name}`)

        return this.#VALUES[name];
    }

    /**
    * Clears the feature context
    */
    static clear() {
        this.#VALUES = {};
    }

    /**
    * Returns true if the named value exists. A value of null returns false!
    * @param {string} name Name of the value
    */
     static hasValue(name) {
        return this.#VALUES[name] != null;
    }

}

module.exports = FeatureContext;
