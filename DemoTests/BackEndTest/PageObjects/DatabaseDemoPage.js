//const sql = require("msnodesqlv8");
var config = require('../../../CommonUtils/dbconfig');
var sql = require("mssql");

class DatabaseDemoPage {
    async queryDemoTable() {
        try {
            const database = new sql.ConnectionPool(config);
            let db = await database.connect();
            console.log(db)
            //let products = await pool.request().query("SELECT *FROM demo_testdata");
            var getData = await new Promise((resolve, reject) => {
                database.query("SELECT *FROM demo_testdata", (error, results) => {
                    if (error) reject(error);

                    if (!results.recordsets[0]) {
                        console.log("No results");
                        resolve(); // give `undefined` to the `await...` and make it stop waiting
                        return;
                    } else {
                        console.log(results.recordsets[0])
                        resolve(results.recordsets[0]);
                    }

                })
            })
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = DatabaseDemoPage;