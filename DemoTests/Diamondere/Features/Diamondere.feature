Feature: Diamondere Westsite - Automation Test
    Background: Browse Diamondere
        Given the user has opened Diamondere portal

    Scenario: Validate all home page menu links
        Then Verify all home page menu links in Diamondere

    Scenario: Diamondere Demo Search
        Given I search for Ring
        Then Ensure Ring search result page is browsed
        And I wait for ad popup and close ad popup