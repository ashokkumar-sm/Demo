Feature: Test API

    Scenario: Call GET Endpoint and Validate status Code
        Given call GET Endpoint and Validate the response

    Scenario: Call GET Endpoint and Validate the response
        Given call GET Endpoint and save result as "GetEndpointResponse" CONTEXT
        Then Ensure following data returned is correct ID <ID>, Email <Email>, FirstName <FirstName>, LastName <LastName>
        Examples:
            | ID | Email                  | FirstName | LastName |
            | 1  | george.bluth@reqres.in | George    | Bluth    |


    Scenario: Call GET Endpoint and Validate the response - Failed Scenario
        Given call GET Endpoint and save result as "GetEndpointResponse" CONTEXT
        Then Ensure following data returned is correct ID <ID>, Email <Email>, FirstName <FirstName>, LastName <LastName>
        Examples:
            | ID | Email         | FirstName | LastName |
            | 1  | test@demo.com | George    | Bluth    |


    Scenario: Call POST Endpoint and Validate Response
        Given Call POST Endpoint and save result as "POSTEndpointResponse" CONTEXT
