Feature: LMJ Westsite - Purchase Test

    Scenario: LMJ - Purchase Flow
        Given the user has opened LMJ portal
        When I select Solitaires from Ring menu
        And I enter username and password and login
        Then I validate user is logged in successfully
        Then Validate Display Price popup
        And I select Trade price and submit
        When I select product from search result page
        And I choose metal type value
        And I choose Gemstone quality
        And I choose total weight
        And Select ring size
        And Select quanitity
        Then Validate estimated delivery time
        And I select add to cart button
        When I select checkout button
        Then Validate order details
        And I select Next button
        Then Validate address is loaded by default
        And I select Next button in address
        Then Validate Order summary
        And Select Place order button
        Then Validate success order popup