Feature: LMJ Westsite - Login Automation Test
        

    Scenario: Validate all home page menu links
    Given the user has opened LMJ portal
        Then Verify all home page menu links in LMJ

    Scenario: LMJ Login - Test - Negative Scenario
    Given the user has opened LMJ portal
        Given I select Login menu link
        And I enter invalid email username and password and login
        Then I validate invalid email error message
        And I enter username and invalid password and login
        Then I validate invalid password error message

    Scenario: LMJ Login - Test - Positive Scenario
         Given the user has opened LMJ portal
        When I select Login menu link
        And I enter username and password and login
        Then I validate user is logged in successfully
        And user selects logout