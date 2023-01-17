const { Given, When, Then } = require('@cucumber/cucumber');
const DatabaseDemoPage = require('../PageObjects/DatabaseDemoPage');
var config = require('../../../CommonUtils/dbconfig');
var sql = require("mssql");



Given(/^Connect to database and query table$/, async () => {
	const demoDatabaseTestPage = new DatabaseDemoPage
    await demoDatabaseTestPage.queryDemoTable() 
    console.log("DB Connected")
});


