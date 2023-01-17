//const { rows } = require('mssql');
const ExcelUtil = require('../../../CommonUtils/ExcelUtil');
var config = require('../../../CommonUtils/dbconfig');
const sql = require('mssql/msnodesqlv8');
const sqlquery = require('../Parameters/DBSQLQueries/DemoSQL.json');
var dbData

class ETLDemoPage {

        /**
     * Read the downloaded file and return a cleaned up version represented in Table format
     * @param {*} filePath - fill file path of the downloaded file
     * @param {*} format - cand be csv, pdf, xls
     * @returns search result in Table format
     */
        readCSV() {
            var filePath = 'C:/UIAutomation - Demo - LiteFury/QualAssured/DemoTests/BackEndTest/Parameters/CSVFile/DemoCSV.csv'
         
             let csv = ExcelUtil.readCsvToJson(filePath)
                    console.log(csv)
                    return csv
    }

    async insertDataToDB(){

        const database = new sql.ConnectionPool(config)
        let db =  await database.connect()
        console.log(db)
         await new Promise((resolve, reject) => {
            database.query(sqlquery.ETLInsert, (error, results) => {
                if (error) reject(error);

                if (!results.rowsAffected[0]) {
                    console.log("No results");
                    resolve(); // give `undefined` to the `await...` and make it stop waiting
                    return;
                } else {
                    resolve(results.rowsAffected[0]); 
                }
            })
        })

    }


    async getLatestDataInserted()
    {
        try {
            const database = new sql.ConnectionPool(config)
            let db =  await database.connect()
            console.log(db)
             await new Promise((resolve, reject) => {
                database.query(sqlquery.ETLGetLatestData, (error, results) => {
                    if (error) reject(error);

                    if (!results.recordsets[0]) {
                        console.log("No results");
                        resolve(); // give `undefined` to the `await...` and make it stop waiting
                        return;
                    } else {
                        resolve(results.recordsets[0]); 
                        dbData = results.recordsets[0]
                    }

                })
            })
        }
        catch (error) {
            console.log(error);
        }
        return dbData
    }


    async readDatabase(){
            try {
                const database = new sql.ConnectionPool(config)
                let db =  await database.connect()
                console.log(db)
                 await new Promise((resolve, reject) => {
                    database.query(sqlquery.ETLExample, (error, results) => {
                        if (error) reject(error);
    
                        if (!results.recordsets[0]) {
                            console.log("No results");
                            resolve(); // give `undefined` to the `await...` and make it stop waiting
                            return;
                        } else {
                            resolve(results.recordsets[0]); 
                            dbData = results.recordsets[0]
                        }
    
                    })
                })
            }
            catch (error) {
                console.log(error);
            }
            return dbData
        }
}

module.exports = ETLDemoPage;