const RestRequests = require("../../../CommonUtils/RestRequests")

class APIDemoTestPage{

    testGetEndpoint(getEndpointURL){
        {
            return browser.call(async () => {
                await RestRequests.fetch_get_request(getEndpointURL)
                if (await RestRequests.getResponseStatus() !== 200)
                    throw new Error('Error:GET Endpoint Failed, It did not return Success')
                    return await RestRequests.getResponseBodyJson()
                })
        }

    }

    testPostEndpoint(postEndpointURL,postBody){
        {
            return browser.call(async () => {
                await RestRequests.fetch_post_request(postEndpointURL,postBody)
                if (await RestRequests.getResponseStatus() !== 201)
                    throw new Error('Error:POST Endpoint Failed, It did not return Success')
                    return await RestRequests.getResponseBodyJson()
                })
        }

    }
}
module.exports = APIDemoTestPage;