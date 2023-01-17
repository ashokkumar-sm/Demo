const { Given, When, Then } = require('@cucumber/cucumber');
const ETLDemoPage = require('../PageObjects/ETLDemoPage');
const context = require('../../../CommonUtils/ScenarioContext')
var config = require('../../../CommonUtils/dbconfig');
const sql = require('mssql/msnodesqlv8');


Given(/^Read CSV file and save in CONTEXT$/, async() => {
    const demoETLTestPage = new ETLDemoPage
    let getCSVData = await demoETLTestPage.readCSV()
    console.log("Read CSV")
    context.setValue('CSVData', getCSVData)
});



When(/^Connect to database and query ETLDemoTable and save in CONTEXT$/, async() => {
    const demoETLTestPage = new ETLDemoPage
    let getDataFromDB = await demoETLTestPage.readDatabase()
    console.log("Read DB")
    context.setValue('DBData', getDataFromDB)
});



When(/^Simulate ETL Service functionality by Inserting a record to database$/, async() => {
    const demoETLTestPage = new ETLDemoPage
    let insertDataFromDB = await demoETLTestPage.insertDataToDB()
    console.log("Read DB")
});



When(/^Connect to database and query latest data inserted and save in CONTEXT$/, async() => {
    const demoETLTestPage = new ETLDemoPage
    let getDataFromDB = await demoETLTestPage.getLatestDataInserted()
    console.log("Read DB")
    context.setValue('LatestData', getDataFromDB)
});



Then(/^Validate latest data inserted to table TransactionNumber (.*),MerchantID (.*),Amount (.*), Reference (.*)$/, (TransactionNumber,MerchantID,Amount,Reference) => {
    let jsonDBData = context.getValue('LatestData')
    let dbDataString = JSON.stringify(jsonDBData[0]); 
    let obj = JSON.parse(dbDataString)
    expect(obj.TransactionNumber).toEqual(TransactionNumber, { message: "Invalid TransactionNumber" })
    expect(obj.MerchantID).toEqual(MerchantID, { message: "Invalid MerchantID" })
    expect(obj.Amount).toEqual(Amount, { message: "Invalid Amount" })
    expect(obj.Reference).toEqual(Reference, { message: "Invalid Reference" })
});



Then(/^Get value from CONTEXT and validate header in database and CSV$/, () => {
    let jsonDBData = context.getValue('DBData')
    let jsonCSVData = context.getValue('CSVData')
    // Read key
     var dbColumnHeader = [];
     var csvColumnHeader = [];
     for (var key in jsonDBData.columns) {
        dbColumnHeader.push(key)
    }
    csvColumnHeader=jsonCSVData[0]
    expect(dbColumnHeader).toEqual(csvColumnHeader, { message: "Invalid ColumnName" })

});



Then(/^Validate transaction data comparing CSV data to DB data$/, () => {
    let jsonDBData = context.getValue('DBData')
    let jsonCSVData = context.getValue('CSVData')
    var csvTransactionData = [];
    let dbDataString = JSON.stringify(jsonDBData[0]); 
    let obj = JSON.parse(dbDataString)
    csvTransactionData=jsonCSVData[1]
    expect(obj.TransactionNumber).toEqual(csvTransactionData[1], { message: "Invalid TransactionNumber" })
    expect(obj.MerchantID).toEqual(csvTransactionData[2], { message: "Invalid MerchantID" })
    expect(obj.Status).toEqual(csvTransactionData[9], { message: "Invalid Status" })
    expect(obj.RefundTransactionNumber).toEqual(csvTransactionData[11], { message: "Invalid Refund TransactionNumber" })
});



