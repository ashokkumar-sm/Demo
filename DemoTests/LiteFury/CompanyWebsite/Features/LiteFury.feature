Feature: LiteFury Westsite - Automation Test
    Background: Browse LiteFury
        Given the user has opened LiteFury portal

    Scenario: Validate all home page menu links
        Then Verify all home page menu links

    Scenario: LiteFury Demo Contact Page
        Given Select contact link
        When User fills contact form and select submit
        Then Verify success message is displayed