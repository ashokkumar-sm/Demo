Feature: LMJ Westsite - Price popup Automation Test

    Scenario: LMJ Login - Test - No Price
        Given the user has opened LMJ portal
        When I select Solitaires from Ring menu
        And I enter username and password and login
        Then I validate user is logged in successfully
        Then Validate Display Price popup
        And I select No price and submit
        Then I validate price is not displayed in UI
        And user selects logout

    Scenario: LMJ Login - Test - Display Trade Price
        Given the user has opened LMJ portal
        When I select Solitaires from Ring menu
        And I enter username and password and login
        Then I validate user is logged in successfully
        Then Validate Display Price popup
        And I select Trade price and submit
        Then I validate Trade price is displayed in UI
        And user selects logout


    Scenario: LMJ Login - Test - Display RRP Price
        Given the user has opened LMJ portal
        When I select Solitaires from Ring menu
        And I enter username and password and login
        Then I validate user is logged in successfully
        Then Validate Display Price popup
        And I select RRP and submit
        Then I validate RRP price is displayed in UI
        And user selects logout