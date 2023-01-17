const Log = require("./Log");
const fs = require('fs');
const path = require("path");

class FileUtil {

    /**
     * Read JSON file and return the content as JSON object.
     * @param {String} jsonPath jsonPath could be FULL PATH or RELATIVE PATH of the JSON file to read.
     * @param {String} cwd [optional] cwd is required when passing RELATIVE PATH, otherwise this parameter should be omitted.
     */
    static readJson(jsonPath, cwd) {
        if (cwd == undefined)
            return JSON.parse(
                fs.readFileSync(jsonPath)
            );
        else
            return JSON.parse(
                fs.readFileSync(path.resolve(cwd, jsonPath))
            );

    }

    /**
     * Returns full path given a relative path and current working directory
     * @param {String} cwd - current working directory
     * @param {String} relativePath - path relative to cwd
     */
    static resolveRelativePath(cwd, relativePath) {
        return path.resolve(cwd, relativePath)
    }

    /**
     * Write data to file
     * @param {String} filePath - full path of file to write on
     * @param {*} data - data to write on file
     * @param {String} encoding - Encoding for the file. default is 'utf8' 
     */
    static witeToFile(filePath, data, encoding = 'utf8') {
        fs.writeFileSync(filePath, data, encoding)
    }

    /**
     * Wait for a file to exist within the allowable time provided as argument
     * Returns a PROMISE
     * @param {String} filePath - full path of the file to check if it exists
     * @param {Number} timeout  - time to wait in Seconds
     */
    static async waitForFileExists(filePath, timeout) {
        return new Promise(function (resolve, reject) {

            var timer = setTimeout(function () {
                watcher.close();
                reject(new Error('File did not exists and was not created during the timeout.'));
            }, timeout * 1000);

            fs.access(filePath, fs.constants.R_OK, function (err) {
                if (!err) {
                    clearTimeout(timer);
                    watcher.close();
                    resolve();
                }
            });

            var dir = path.dirname(filePath);
            var basename = path.basename(filePath);
            var watcher = fs.watch(dir, function (eventType, filename) {
                if (eventType === 'rename' && filename === basename) {
                    clearTimeout(timer);
                    watcher.close();
                    resolve();
                }
            });
        });
    }

    /**
     * Rename a file
     * @param {*} oldFilePath - original file path
     * @param {*} newFilePath - new file path
     */
    static renameFile(oldFilePath, newFilePath) {
        fs.renameSync(oldFilePath, newFilePath)
    }

    /**
     * Read a file
     * @param {*} filePath - file path 
     * @param {*} [encoding='utf8'] - file encoding
     */
    static readFile(filePath, encoding = 'utf8') {
        let dataBuffer = fs.readFileSync(filePath, encoding)
        return dataBuffer
    }

    /**
     * Opens a file, replace all RegEx match with a substitute string
     * Returns a PROMISE
     * @param {String} filePath 
     * @param {RegExp} regexpFind - search regex 
     * @param {String} replace - substitute string
     */
    static async searchReplaceInFile(filePath, regexpFind, replace,) {
        return new Promise(function (resolve, reject) {
            var file = fs.createReadStream(filePath, 'utf8');
            var newFile = '';

            file.on('data', function (chunk) {
                newFile += chunk.toString().replace(regexpFind, replace);
            });

            file.on('end', function () {
                fs.writeFile(filePath, newFile, function (err) {
                    if (err) {
                        reject(new Error(err));
                        //throw new Error(err);
                    } else {
                        Log.info('Updated!');
                        resolve()
                    }
                });
            });
        });
    }




}
module.exports = FileUtil;