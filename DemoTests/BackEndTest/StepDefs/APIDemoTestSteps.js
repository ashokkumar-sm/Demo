const { Given, When, Then } = require('@cucumber/cucumber');
const RestRequests = require('../../../CommonUtils/RestRequests');
const APIDemoTestPage = require('../PageObjects/APIDemoTestPage');
const postBody =  require('../Parameters/JSONRequestBodies/POSTBody.json');
const context = require('../../../CommonUtils/ScenarioContext');
const { config } = require('../Config//API_' + global.testEnv + '.js');

/************************GIVENS********************/

Given(/^call GET Endpoint and Validate the response$/, () => {
    const demoTestPage = new APIDemoTestPage
    const getEndpointURL = config.getEndpointURL
    demoTestPage.testGetEndpoint(getEndpointURL)
});



Given(/^call GET Endpoint and save result as "GetEndpointResponse" CONTEXT$/, () => {
    const demoTestPage = new APIDemoTestPage
    const getEndpointURL = config.getEndpointURL
    let getEndpointResponse = demoTestPage.testGetEndpoint(getEndpointURL)
    context.setValue('GetEndpointResponse',getEndpointResponse)
});



Given(/^Call POST Endpoint and save result as "POSTEndpointResponse" CONTEXT$/, () => {
    const demoTestPage = new APIDemoTestPage
    const postEndpointURL = config.postEndpointURL
    let postEndpointResponse = demoTestPage.testPostEndpoint(postEndpointURL,postBody)
    context.setValue('POSTEndpointResponse',postEndpointResponse)
});


/************************THENS********************/


Then(/^Ensure following data returned is correct ID (.*), Email (.*), FirstName (.*), LastName (.*)$/, (ID,Email,FirstName,LastName) => {
    let GetEndpointResponse = context.getValue('GetEndpointResponse')
    if (ID == '1') {
		ID = eval('(' + ID + ')')
	}
    expect(GetEndpointResponse.data[0].id).toEqual(ID, { message: "Invalid ID" })
    expect(GetEndpointResponse.data[0].email).toEqual(Email, { message: "Invalid Email" })
    expect(GetEndpointResponse.data[0].first_name).toEqual(FirstName, { message: "Invalid FirstName" })
    expect(GetEndpointResponse.data[0].last_name).toEqual(LastName, { message: "Invalid LastName" })
});
