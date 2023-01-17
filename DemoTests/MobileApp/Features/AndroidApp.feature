Feature: Mobile App Demo

    Scenario: Android App Demo
        Given Launch mobile app
        When I select search and search for a product
        Then Ensure search result is displayed