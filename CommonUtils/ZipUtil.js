const extract = require('extract-zip');
const Log = require('./Log');


class ZipUtil {

    /**
     * unzips a zip file found at 'filePath' to a 'target' directory
     * @param {*} filPath 
     * @param {*} target 
     */
    static async unzip(filPath, target) {

        return new Promise(function (resolve, reject) {
            extract(filPath, {
                dir: target, onEntry: (entry, zipFile) => {
                    Log.info(`extracting: ${target}\\${entry.fileName}`)
                }
            }).then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            })
        });

    }


}
module.exports = ZipUtil;